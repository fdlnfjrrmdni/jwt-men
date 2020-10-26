const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};

isSuperadmin = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i=0; i < roles.length; i++) {
					if (roles[i].name === "superadmin") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require Superadmin Role!" });
				return;
			}
		);
	});
};

isAdmin = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i=0; i < roles.length; i++) {
					if (roles[i].name === "admin") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require admin Role!" });
				return;
			}
		);
	});
};

isDirector = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i=0; i < roles.length; i++) {
					if (roles[i].name === "director") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require director Role!" });
				return;
			}
		);
	});
};

isHoe = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i=0; i < roles.length; i++) {
					if (roles[i].name === "hoe") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require head of engineering Role!" });
				return;
			}
		);
	});
};

isOperator = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i=0; i < roles.length; i++) {
					if (roles[i].name === "operator") {
						next();
						return;
					}
				}

				res.status(403).send({ message: "Require operator Role!" });
				return;
			}
		);
	});
};

const authJwt = {
	verifyToken,
	isSuperadmin,
	isAdmin,
	isDirector,
	isHoe,
	isOperator
};

module.exports = authJwt;
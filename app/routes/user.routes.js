const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/test/all", controller.allAccess);

	app.get("/api/test/superadmin", [authJwt.verifyToken, authJwt.isSuperadmin], controller.superadminBoard);

	app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

	app.get("/api/test/director", [authJwt.verifyToken, authJwt.isDirector], controller.directorBoard);

	app.get("/api/test/hoe", [authJwt.verifyToken, authJwt.isHoe], controller.hoeBoard);

	app.get("/api/test/operator", [authJwt.verifyToken, authJwt.isOperator], controller.operatorBoard);
};
const db = require("../models");
const Group = db.group;

exports.findAll = (req, res) => {
	const name = req.query.name;
  	let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  	Group.find(condition).then(data => {
  		res.send(data);
  	}).catch(err => {
  		res.status(500).send({
	        message: err.message || "Some error occurred while retrieving goods."
	    });
  	});
};
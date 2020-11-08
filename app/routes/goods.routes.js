const { authJwt } = require("../middlewares");
const goods = require("../controllers/goods.controller.js");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	let router = require("express").Router();

	// Create
	router.post("/", [authJwt.verifyToken], goods.create);

	// Retrieve all goods
	router.get("/", [authJwt.verifyToken], goods.findAll);

	// Retrtieve a single goods
	router.get("/:id", [authJwt.verifyToken], goods.findOne);

	// Update
	router.put("/:id", [authJwt.verifyToken], goods.update);

	// Delete
	router.delete("/:id", [authJwt.verifyToken], goods.delete);

	// Delete all
	router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], goods.deleteAll);

	app.use('/api/goods', router);
}
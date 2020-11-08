const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.goods = require("./goods.model");
db.group = require("./group.model");

db.ROLES = ["user", "admin"];

module.exports = db;
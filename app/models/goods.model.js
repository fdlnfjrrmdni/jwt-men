const mongoose = require('mongoose');

const Goods = mongoose.model(
	"Goods",
	new mongoose.Schema({
      	code: String,
      	description: String,
      	group: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group"
        },
      	by: {
    			type: mongoose.Schema.Types.ObjectId,
    			ref: "User"
    		}
    },
    { timestamps: true })
);

module.exports = Goods;
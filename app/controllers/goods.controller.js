const db = require("../models");
const Goods = db.goods;
const Group = db.group;

exports.create = (req, res) => {
  	if (!req.body.code || !req.body.description || !req.body.group || !req.body.by) {
  		res.status(400).send({ message: "Content can not be empty!" });
  		return;
  	}

  	const goods = new Goods({
      by: req.body.by,
  		code: req.body.code,
  		description: req.body.description
  	})

    goods.save((err, goods) => {
      if (err) {
        res.status(500).send({ message: err || "Some error occurred while creating Goods." });
        return;
      }

      Group.findOne({ name: req.body.group }, (err, group) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        goods.group = group.id;
        goods.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Goods was added successfully.", data: goods });
        });
      });

    });
};

exports.findAll = (req, res) => {
  	const description = req.query.description;
  	let condition = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};

  	Goods.find(condition).then(data => {
  		res.send(data);
  	}).catch(err => {
  		res.status(500).send({
	        message: err.message || "Some error occurred while retrieving goods."
	    });
  	})
};

exports.findOne = (req, res) => {
  	const id = req.params.id;

  	Goods.findById(id).then(data => {
  		if (!data)
	        res.status(404).send({ message: "Not found Goods with id " + id });
	    else res.send(data)
  	}).catch(err => {
  		res.status(500).send({ 
  			message: "Error retrieving Goods with id=" + id 
  		});
  	});
};

exports.update = (req, res) => {
  	if (!req.body) {
  		return res.status(400).send({
  			message: "Data to update can not be empty!"
  		});
  	}

  	const id = req.params.id;

    if (req.body.group) {
      Group.findOne({ name: req.body.group }, (err, group) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
          req.body.group = group.name;
          Goods.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Goods with id=${id}. Maybe Goods was not found!`
              });
            } else res.send({ message: "Goods was updated successfully." });
          }).catch(err => {
            res.status(500).send({ message: err || "Error updating Goods with id=" + id });
          });
        }
      });
    } else {
      Goods.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Goods with id=${id}. Maybe Goods was not found!`
          });
        } else res.send({ message: "Goods was updated successfully." });
      }).catch(err => {
        res.status(500).send({ message: err || "Error updating Goods with id=" + id });
      });
    }
};

exports.delete = (req, res) => {
  	const id = req.params.id;

  	Goods.findByIdAndRemove(id).then(data => {
  		if (!data) {
  			res.status(404).send({
  				message: `Cannot delete Goods with id=${id}. Maybe Goods was not found!`
  			});
  		} else {
  			res.send({
  				message: "Goods was deleted successfully!"
  			});
  		}
  	}).catch(err => {
  		res.status(500).send({
  			message: "Could not delete Goods with id=" + id
  		});
  	});
};

exports.deleteAll = (req, res) => {
  	Goods.deleteMany({}).then(data => {
  		res.send({
	        message: `${data.deletedCount} Goods were deleted successfully!`
	    });
  	}).catch(err => {
  		res.status(500).send({
	        message: err.message || "Some error occurred while removing all goods."
	    });
  	});
};
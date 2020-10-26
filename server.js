require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = require('./app/models');
const Role = db.Role;

let corsOption = {
	origin: 'http://localhost:3000'
}

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('./app/config/db.config');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
	res.json({ message: "JWT Authentication & Authorization" });
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
})

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "superadmin"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'superadmin' to roles collection")
			});

			new Role({
				name: "admin"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'admin' to roles collection")
			});

			new Role({
				name: "director"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'director' to roles collection")
			});

			new Role({
				name: "head of engineering"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'head of engineering' to roles collection")
			});

			new Role({
				name: "operator"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'operator' to roles collection")
			});
		}
	});
}
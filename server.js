require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let corsOption = {
	origin: ['http://localhost:8080','https://jwtmern.herokuapp.com']
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
require('./app/routes/goods.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
})
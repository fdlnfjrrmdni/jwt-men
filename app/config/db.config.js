require('dotenv').config();

const mongoose = require('mongoose');
const db = process.env.DB;

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('mongodb connected...')
}).catch(err => console.log(err))

mongoose.Promise = global.Promise;

module.exports = mongoose;
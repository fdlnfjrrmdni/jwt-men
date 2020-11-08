require('dotenv').config();

const mongoose = require('mongoose');
const db = process.env.DB || "mongodb://admin:admin123@mycluster-shard-00-00-ni1c1.gcp.mongodb.net:27017,mycluster-shard-00-01-ni1c1.gcp.mongodb.net:27017,mycluster-shard-00-02-ni1c1.gcp.mongodb.net:27017/62?ssl=true&replicaSet=myCluster-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('mongodb connected...')
}).catch(err => console.log(err))

mongoose.Promise = global.Promise;

module.exports = mongoose;
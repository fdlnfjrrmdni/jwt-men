const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

let corsOption = {
	origin: 'http://localhost:3000'
}

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: "JWT Authentication & Authorization" });
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
})
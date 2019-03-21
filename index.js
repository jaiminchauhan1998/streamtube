const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//DB conf
const db = require('./config/keys.js').mongoURI;

console.log(db);

mongoose.connect(db)
	.then( ()=>console.log('connected'))
	.catch(err=>console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server running on port ${port}`));

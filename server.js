const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');

const credential = {};

fs.readFile('./config/client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
	}
	
	// store the credentials, in variable.
	credential.clientSecret = content;
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//DB conf
const db = require('./config/keys.js').mongoURI;
mongoose.connect(db)
	.then( ()=>console.log('connected'))
	.catch(err=>console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);


app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(5555, ()=> console.log(`server running on port ${port}`));

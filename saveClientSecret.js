const mongoose = require('mongoose');
const ClientSecret = require('./models/ClientSecret');

var fs = require('fs');
var readline = require('readline');

const db = require('./config/keys.js').mongoURI;


fs.readFile('./config/client_secret.json', (err, content) => {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    clientSecretWeb = JSON.parse(content);

    const newClientSecret = new ClientSecret({
        web: clientSecretWeb.web
    });
    newClientSecret.save();
});

mongoose.connect(db);

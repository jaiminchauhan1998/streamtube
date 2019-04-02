var fs = require('fs');
var readline = require('readline');
var {
    google
} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const Token = require('../models/Token');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

function tokenize(user, callback) {
    const credentials = client_secret;
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = credentials.web.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token in databse remplace readfile with mongoose function
    Token.findOne(usernane:user, (err, res) => {
        oauth2Client.credentials = JSON.parse(res.token);
        callback(oauth2Client)
    })
}

module.exports= tokenize;
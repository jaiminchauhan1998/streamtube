var fs = require('fs');
var readline = require('readline');
var {
    google
} = require('googleapis');
var OAuth2 = google.auth.OAuth2;


// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const ClientSecret = require('../models/ClientSecret');
const Token = require('../models/Token');

var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

function authorize(req, res, next) {
    
    const credentials = client_secret;
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = credentials.web.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });

    req.oauthurl = authUrl;

    next()
}

module.exports = authorize;
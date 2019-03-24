var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/google-apis-nodejs-streamtube.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';


function authorize(credentials, requestData, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, requestData, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, requestData);
    }
  });
}

function subscriptionsListByChannelId(auth, requestData) {
  var service = google.youtube('v3');
  var parameters = removeEmptyParameters(requestData['params']);
  parameters['auth'] = auth;
  service.subscriptions.list(parameters, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log(response);
  });
}

fs.readFile('./config/client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  //See full code sample for authorize() function code.
  authorize(JSON.parse(content), {'params': {'channelId': 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
  'part': 'snippet,contentDetails'}}, subscriptionsListByChannelId);
});

function removeEmptyParameters(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}

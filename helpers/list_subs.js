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
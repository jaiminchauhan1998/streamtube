const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSecret = new Schema({
    web: {
        client_id: {
            type: String,
            required: true
        },
        project_id: {
            type: String,
            required: true
        },
        auth_uri: {
            type: String,
            required: true
        },
        token_uri: {
            type: String,
            required: true
        },
        auth_provider_x509_cert_url: {
            type: String,
            required: true
        },
        client_secret: {
            type: String,
            required: true
        },
        redirect_uris: {
            type: Array,
            required: true
        }
    }
});

module.exports = mongoose.model('clientsecret', ClientSecret)
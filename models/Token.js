const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    scope: {
        type: String,
        required: true,
    },
    token_type: {
        type: String,
        required: true,
    },
    expiry_date: {
        type: String,
        required: true,
    }
});

module.exports = Token = mongoose.model('tokens', UserSchema)
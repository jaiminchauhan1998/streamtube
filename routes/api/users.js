const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const authorize = require('../../oauth/authorize')
//load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User');
const Token = require('../../models/Token');
const key = require('../../config/keys');

const app = express();
app.use(authorize)

router.post('/register', (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body)
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    };

    User.findOne({
            username: req.body.username
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    username: 'username already exist'
                });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const password = req.body.password;
    User.findOne({
            username: req.body.username
        })
        .then(user => {
            if (!user) {
                errors.username = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            avatar: user.avatar
                        }
                        jwt.sign(
                            payload,
                            key.secretOrKey, {
                                expiresIn: 1000
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = "Password incorrect";
                        return res.status(400).json(errors);
                    }
                })
        })
});

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        msg: 'success',
        user: req.user.username
    });
    //return user id and username
});
router.get('/oauthstatus', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if(Token.findOne({username: req.user.username})){
        res.json({
            msg: "found"
        })
    }
});


router.post('/oauth', passport.authenticate('jwt', {
    session: false
}), authorize, (req, res) => {
    res.send(req.oauthurl)
});

router.get('/oauthcallback', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    //use  jwtoken to get user
    const username = req.username;
    console.log(username);
    const code = req.code;
    oauth2Client.getToken(code, function(err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        oauth2Client.credentials = token;
        const newToken = new Token({
            username: username,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            scope: token.scope,
            token_type: token.token_type,
            expiry_date: token.expiry_date
        })
        newToken.save();
    });
});

module.exports = router;
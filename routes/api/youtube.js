const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport')

const Youtube = require('../../Youtube/index')

router.get('/search', (req, res) => {
    res.send(Youtube.search(req.user, req.query));
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');

const authorize = express.Router();
const { masterKey } = require('../config/config');

authorize.use((req, res, next) => {
  const token = req.header['access-token']; // check
  jwt.verify(token, masterKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ message: 'Invalid token' });
    } else {
      req.decoded = decoded; // check
      next();
    }
  });
});

module.exports = {
  authorize: authorize,
};

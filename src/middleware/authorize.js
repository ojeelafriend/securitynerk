const express = require('express');
const jwt = require('jsonwebtoken');

const authorize = express.Router();
const { masterKey } = require('../config/config');

authorize.use((req, res, next) => {
  const token = req.header('access-token');
  jwt.verify(token, masterKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  });
});

module.exports = {
  authorize: authorize,
};

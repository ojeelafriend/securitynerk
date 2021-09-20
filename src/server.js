const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { masterKey } = require('./config/config');

app.use(express.json(), express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Get /');
});

app.post('/authenticate', async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  const payload = {
    check: true,
  };

  if (user.username === 'root' && user.password === 'krnl123') {
    const token = jwt.sign(payload, masterKey, { expiresIn: 1400 });
    console.log('token: ' + token);
  } else {
    res.send('Bad request');
  }
});

app.listen(3000, () => {
  console.log('Connection successfully');
});

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const { authorize } = require('./middleware/authorize');
const { masterKey } = require('./config/config');

app.use(express.json(), express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Get /');
});

//Petición para ingresar al localhost:3000/user. Al ser get solo quiero ver la pagina, si es que estoy autenticado.
app.get('/user', authorize, (req, res) => {
  res.send('Heeey');
});

//Uso esta extensión localhost:3000/authenticate. Al ser post envio datos para autenticarme
app.post('/authenticate', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  const payload = {
    check: true,
  };

  if (user.username === 'root' && user.password === 'krnl123') {
    const token = jwt.sign(payload, masterKey, { expiresIn: 1400 });
    res.send({ token: token });
  } else {
    res.send('Bad request');
  }
});

app.listen(3000, () => {
  console.log('Connection successfully');
});

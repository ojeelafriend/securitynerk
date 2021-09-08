const express = require("express");
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Connection successfully");
});

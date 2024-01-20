// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
require("./database/index");

const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.Port, () => {
  console.log("porta 3000");
});

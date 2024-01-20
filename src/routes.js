const { Router } = require("express");

const UserController = require("./apps/controllers/userController");

const routes = new Router();

routes.post("/users", UserController.create);

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));

module.exports = routes;

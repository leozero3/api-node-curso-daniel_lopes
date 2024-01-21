const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");

const UserController = require("./apps/controllers/userController");
const UserSchema = require("./schema/create.user.schema.json");

const routes = new Router();

routes.post("/users", schemaValidator(UserSchema), UserController.create);

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));

module.exports = routes;

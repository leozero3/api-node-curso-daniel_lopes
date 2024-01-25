const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const UserController = require("./apps/controllers/userController");
const UserSchema = require("./schema/create.user.schema.json");

const AuthenticatorController = require("./apps/controllers/authenticationController");
const AuthSchema = require("./schema/auth.schema.json");

const routes = new Router();

routes.post("/users", schemaValidator(UserSchema), UserController.create);

routes.post(
  "/auth",
  schemaValidator(AuthSchema),
  AuthenticatorController.authenticate
);

routes.use(AuthenticationMiddleware);

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));

module.exports = routes;

const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const UserController = require("./apps/controllers/userController");
const UserSchema = require("./schema/create.user.schema.json");

const AuthenticatorController = require("./apps/controllers/authenticationController");
const AuthSchema = require("./schema/auth.schema.json");
const userController = require("./apps/controllers/userController");

const routes = new Router();

routes.post("/users", schemaValidator(UserSchema), UserController.create);

routes.post(
  "/auth",
  schemaValidator(AuthSchema),
  AuthenticatorController.authenticate
);

routes.put("/users", userController.update);

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));
routes.use(AuthenticationMiddleware);

module.exports = routes;

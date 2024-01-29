const { Router } = require("express");
const { upload } = require("./configs/multer");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const UserController = require("./apps/controllers/userController");
const UserSchema = require("./schema/create.user.schema.json");

const AuthenticatorController = require("./apps/controllers/authenticationController");
const AuthSchema = require("./schema/auth.schema.json");
const userController = require("./apps/controllers/userController");

const FileController = require("./apps/controllers/FileController");

const routes = new Router();

routes.post("/users", schemaValidator(UserSchema), UserController.create);

routes.post(
  "/auth",
  schemaValidator(AuthSchema),
  AuthenticatorController.authenticate
);

routes.use(AuthenticationMiddleware);
routes.put("/users", userController.update);
routes.delete("/users", userController.delete);

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));
routes.get("/user-profile", UserController.userProfile, (req, res) =>
  res.send({ message: "conectado!!" })
);
routes.post("/upload", upload.single("image"), FileController.upload);

module.exports = routes;

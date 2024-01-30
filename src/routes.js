const { Router } = require("express");
const { upload } = require("./configs/multer");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthenticationMiddleware = require("./apps/middlewares/authentication");

const UserController = require("./apps/controllers/userController");
const UserSchema = require("./schema/create.user.schema.json");

const AuthenticatorController = require("./apps/controllers/authenticationController");
const AuthSchema = require("./schema/auth.schema.json");
const userController = require("./apps/controllers/userController");

const PostController = require("./apps/controllers/PostController");
const PostSchema = require("./schema/post.schema.json");

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
routes.post("/new-post", schemaValidator(PostSchema), PostController.create);
routes.delete("/delete-post/:id", PostController.delete);
routes.put("/update-post/:id", PostController.update);
routes.put("/add-like/:id", PostController.addLike);
routes.get("/list-my-posts", PostController.listMyPosts);

module.exports = routes;

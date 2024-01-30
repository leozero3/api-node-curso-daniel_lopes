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

routes.get("/health", (req, res) => res.send({ message: "conectado!!" }));
routes.post(
  "/auth",
  schemaValidator(AuthSchema),
  AuthenticatorController.authenticate
);
routes.post("/user", schemaValidator(UserSchema), UserController.create);

routes.use(AuthenticationMiddleware);

routes.put("/user", userController.update);
routes.delete("/user", userController.delete);
routes.get("/user", UserController.userProfile);

routes.post("/upload", upload.single("image"), FileController.upload);

routes.post("/posts", schemaValidator(PostSchema), PostController.create);
routes.delete("/posts/:id", PostController.delete);
routes.put("/posts/:id", PostController.update);
routes.put("/posts/add-like/:id", PostController.addLike);
routes.get("/posts/list-my-posts", PostController.listMyPosts);
routes.get("/posts/all-posts", PostController.listAllPosts);

module.exports = routes;

// userController.js
const Users = require("../models/users");

class UserController {
  async create(req, res) {
    try {
      const verifyUser = await Users.findOne({
        where: { email: req.body.email },
      });
      if (verifyUser) {
        return res.status(400).json({ message: "Usuario ja Existe" });
      }
      const { name, user_name, email, avatar, bio, gender, password_hash } =
        req.body;

      // Certifique-se de fornecer o valor para user_name
      const user = await Users.create({
        name,
        user_name,
        email,
        avatar,
        bio,
        gender,
        password_hash,
      });

      res.send({ user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = new UserController();

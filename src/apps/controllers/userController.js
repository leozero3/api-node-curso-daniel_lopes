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

      const user = await Users.create(req.body);
      if (!user) {
        res.status(400).send({ error: "Erro ao criar usuario" });
      }
      return res.send({ user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = new UserController();

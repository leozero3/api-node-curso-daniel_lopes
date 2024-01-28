const Users = require("../models/users");
const bcryptjs = require("bcryptjs");

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

  async update(req, res) {
    const {
      name,
      avatar,
      bio,
      gender,
      old_password,
      new_password,
      confirm_new_password,
    } = req.body;

    const user = await Users.findOne({
      where: { id: req.userId },
    });

    console.log(user);

    if (!user) {
      console.log("!id");
      return res.status(400).json({ message: "Usuario nao existe!" });
    }

    let encryptedPassword = "";

    if (old_password) {
      console.log("old_password");
      if (!(await user.checkPassword(old_password))) {
        return res.status(401).json({ error: "Senha antiga incorreta" });
      }
      if (!new_password || !confirm_new_password) {
        return res
          .status(401)
          .json({ error: "Voce precisa informar a senha e confirmar a senha" });
      }
      if (new_password !== confirm_new_password) {
        return res
          .status(401)
          .json({ error: "nova senha e confirma senha sao diferentes" });
      }

      encryptedPassword = await bcryptjs.hash(new_password, 8);
    }

    await Users.update(
      {
        name: name || user.name,
        avatar: avatar || user.avatar,
        bio: bio || user.bio,
        gender: gender || user.gender,
        password_hash: encryptedPassword || user.password_hash,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    return res.status(200).json({ message: "User updated!!" });
  }

  async delete(req, res) {
    const userToDelete = await Users.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!userToDelete) {
      return res.status(400).json({ message: "Usuario nao existe" });
    }

    await Users.destroy({
      where: {
        id: req.userId,
      },
    });
    return res.status(200).json({ message: "Usuario deletado" });
  }
}

module.exports = new UserController();

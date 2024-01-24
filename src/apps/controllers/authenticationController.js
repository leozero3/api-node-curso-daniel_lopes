const jwt = require("jsonwebtoken");

const Users = require("../models/users");
const { encrypt } = require("../../utils/crypt");

const { Op } = require("sequelize");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    const whereClause = {};
    if (email) {
      whereClause.email = email;
    } else if (user_name) {
      whereClause.user_name = user_name;
    } else {
      return res.status(401).json({ error: "precisa de email ou senha!" });
    }

    const user = await Users.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.status(401).json({ error: "user not found!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "senha errada!" });
    }

    const { id, user_name: userName } = user;

    const { iv, content } = encrypt(id);

    const newId = `${iv}:${content}`;

    const token = jwt.sign({ useId: newId }, process.env.HASH_BCRYPT, {
      expiresIn: process.env.EXPIRE_IN,
    });

    return res
      .status(200)
      .json({ user: { id, user_name: userName }, token: token });
  }
}

module.exports = new AuthenticationController();

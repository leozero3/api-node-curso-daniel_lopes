const jwt = require("jsonwebtoken");

const Users = require("../models/users");

const { Op } = require("sequelize");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    let whereClause = {};
    if (email) {
      whereClause = { email };
    } else if (user_name) {
      whereClause = { user_name };
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
    return res.status(200).json({ user: user });
  }
}

module.exports = new AuthenticationController();

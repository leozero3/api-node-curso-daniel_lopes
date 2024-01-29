const Sequelize = require("sequelize");

const Users = require("../apps/models/users");
const Posts = require("../apps/models/posts");

const models = [Users, Posts];
const databaseConfig = require("../configs/db");

class Database {
  constructor() {
    this.init();
  }

  init() {
    // INICIALIZACAO DA CONEXAO
    this.connection = new Sequelize(databaseConfig);
    // INICIALIZACAO Do DB
    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();

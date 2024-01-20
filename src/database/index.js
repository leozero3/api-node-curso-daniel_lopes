const Sequelize = require("sequelize");

const Users = require("../apps/models/users");
const models = [Users];
const databaseConfig = require("../configs/db");

class Database {
  constructor() {
    this.init();
  }

  init() {
    // INICIALIZACAO DA CONEXAO
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();

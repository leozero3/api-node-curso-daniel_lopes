const { Router } = require('express');

const routes = new Router();

routes.get('/health', (req, res) => res.send(
  { message: 'conectado!!' },
));

module.exports = routes;

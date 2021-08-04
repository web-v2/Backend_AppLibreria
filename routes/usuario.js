const express = require("express");
const ruta = express.Router();
const { seguridad } = require('../middleware/seguridad');

const { login, getUsuario, registrarUsuario } = require('../controllers/usuario');

ruta.get('/', seguridad, getUsuario);
ruta.post('/registrar', registrarUsuario);
ruta.post('/login', login);

module.exports = ruta;
const express = require('express');
const ruta = express.Router();

const { registrarUsuario, login, getUsuario } = require('../controllers/usuario');

ruta.get('/', getUsuario);
ruta.post('/registrar', registrarUsuario);
ruta.post('/login', login);

module.exports = ruta;
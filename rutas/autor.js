const Router = require('express');
const express = require('express');
const ruta = express.Router();
const { crearAutor, getAutor, getAutorById, updateAutor, deleteAutor }=require('../controllers/autor');

ruta.route('/').post(crearAutor).get(getAutor)
ruta.route('/:id').get(getAutorById).put(updateAutor).delete(deleteAutor)

module.exports = ruta;

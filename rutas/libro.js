const express = require('express');
const ruta = express.Router();
const { getLibros, getLibroById, crearLibro, updateLibro, deleteLibro, pagination } = require('../controllers/libro.js');

ruta.route('/').get(getLibros).post(crearLibro);
ruta.route('/:id').get(getLibroById).put(updateLibro).delete(deleteLibro);
ruta.route('/pagination').post(pagination);
module.exports=ruta;
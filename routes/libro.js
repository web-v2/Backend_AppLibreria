const { Router } = require("express");
const express = require("express");
const ruta = express.Router();
const { seguridad } = require('../middleware/seguridad');


const {
    getLibroById,
    getLibros,
    crearLibro,
    updateLibro,
    deleteLibro,
    pagination
} = require("../controllers/libro");

ruta
    .route('/')
    .get(seguridad, getLibros)
    .post(seguridad, crearLibro)

ruta
    .route('/:id')
    .get(seguridad, getLibroById)
    .put(seguridad, updateLibro)
    .delete(seguridad, deleteLibro)

ruta
    .route('/pagination')
    .post(seguridad, pagination)

module.exports = ruta;
const mongoose = require('mongoose');
const AutorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    gradoAcademico: String,
    nombreCompleto: String
});

module.exports = mongoose.model('Autor', AutorSchema);
const mongoose = require('mongoose');
const LibroSchema = new mongoose.Schema({
    titulo: {
        required:[true,'Ingrese un titulo del libro'], 
        maxlength: [500, 'El titulo del libro no puede ser mayor a 500 caracteres'], 
        type: String},
    description: String,
    precio: Number,
    fechaPublicacion: Date,
    autor: {id: String, nombreCompleto: String}
});

module.exports = mongoose.model('Libro', LibroSchema);
const errorHandler = (err, req, res, next) =>{
    console.log('Error en mi controllers: ', err);
    res.status(500).json({status: 500, mensaje: err.message});
}

module.exports = errorHandler;
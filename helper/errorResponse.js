class ErrorResponse extends Error{
    constructor (mensaje, statusCode){
        super(mensaje);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;
const ErrorResponse = require("../helper/errorResponse");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.seguridad = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("El cliente no envio el token", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
        console.log("token", decoded);

        const usuarioBD = await Usuario.findOne({ userName: decoded.username });

        req.usuario = usuarioBD;

        next();
    } catch (err) {
        return next(new ErrorResponse("Errores en el procesamiento del token " + err, 400));
    }
};
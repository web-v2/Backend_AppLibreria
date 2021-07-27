const ErrorResponse = require('../helper/errorResponse');
const Usuario = require('../models/Usuario');

exports.registrarUsuario = async (req, res, next) => {
    try {
        const { nombre, apellido, username, email, password } = req.body;
        const usrBD = await Usuario.create({
            nombre,
            apellido,
            userName: username,
            email,
            password,
        });
        const token = usrBD.crearJsonWebToken();
        res.status(200).json({
            status: 200,
            id: usrBD._id,
            nombre,
            apellido,
            username,
            email,
            token,
        });
    } catch (err) {
        next(new ErrorResponse("Error registrando usuario" + err, 400));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse("Ingrese un email y un password", 400));
        }
        const usuarioBD = await Usuario.findOne({ email }).select("+password");
        if (!usuarioBD) {
            return next(
                new ErrorResponse("El usuario no existe en la base de datos", 400)
            );
        }
        const valorBool = await usuarioBD.validarPassword(password);
        if (!valorBool) {
            return next(new ErrorResponse("Las credenciales son incorrectas", 400));
        }

        const token = usuarioBD.crearJsonWebToken();
        res.status(200).json({
            status: 200,
            id: usuarioBD._id,
            nombre: usuarioBD.nombre,
            apellido: usuarioBD.apellido,
            username: usuarioBD.userName,
            email: usuarioBD.email,
            token,
        });
    } catch (err) {
        next(new ErrorResponse("Error en el login" + err, 400));
    }
};

exports.getUsuario = async (req, res, next) => {
    try {
        const usuarioToken = req.usuario;
        const token = await usuarioToken.crearJsonWebToken();
        res.status(200).json({
            status: 200,
            id: usuarioToken._id,
            nombre: usuarioToken.nombre,
            apellido: usuarioToken.apellido,
            username: usuarioToken.userName,
            email: usuarioToken.email,
            token,
        });
    } catch (err) {
        next(
            new ErrorResponse("Error obteniendo la sesion del usuario " + err, 400)
        );
    }
};

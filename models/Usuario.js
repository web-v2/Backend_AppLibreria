const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsuarioSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: [true, "Por favor ingrese un nombre"],
    },
    apellidos: {
        type: String,
        required: [true, "Por favor ingrese el apellido"],
    },
    userName: {
        type: String,
        required: [true, "Por favor ingrese un username"],
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese un email"],
        unique: true,
        match: [
            /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
            "Ingrese un email valido",
        ],
    },
    password: {
        type: String,
        required: [true, "Por favor ingrese un password"],
        minlength: 6,
        select: false,
    },
});

UsuarioSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

UsuarioSchema.methods.crearJsonWebToken = function () {
    return jwt.sign({ username: this.userName }, process.env.JWT_SECRET_WORD, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UsuarioSchema.methods.validarPassword = async function (passwordUsuario) {
    return await bcrypt.compare(passwordUsuario, this.password);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
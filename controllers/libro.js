const Libro = require("../models/Libro");
const ErrorResponse = require("../helper/errorResponse");

exports.getLibros = async (req, res, next) => {
    try {
        const libroLista = await Libro.find();

        res.status(200).json(libroLista);
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.getLibroById = async (req, res, next) => {
    try {
        const libroUnique = await Libro.findById(req.params.id);

        if (!libroUnique) {
            return next(new ErrorResponse("No se pudo encontrar el libro", 400));
        }
        res.status(200).json(libroLista);
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.crearLibro = async (req, res, next) => {
    try {
        console.log('req body', req.body);

        const libroUnique = await Libro.create(req.body);

        res.status(200).json({
            status: 200,
            data: libroUnique,
        });
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.updateLibro = async (req, res, next) => {
    try {
        const libroUnique = await Libro.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            status: 200,
            data: libroUnique,
        });
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.deleteLibro = async (req, res, next) => {
    try {
        const libroUnique = await Libro.findByIdAndDelete(req.params.id);

        if (!libroUnique) {
            return next(new ErrorResponse("El libro no existe", 400));
        }

        res.status(200).json({
            status: 200,
            data: libroUnique,
        });
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};

exports.pagination = async (req, res, next) => {
    try {
        const sort = req.body.sort;
        const sortDirecion = req.body.sortDirecion;
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);

        let filterValor = "";
        let filterPropiedad = "";
        let libros = [];

        let totalRows = 0;
        // filterValue = { valor:"" , propiedad : ""}
        if (req.body.filterValue) {
            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;

            libros = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i"),
            })
                .sort({ [sort]: sortDirecion })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRows = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i"),
            }).count();
        } else {
            libros = await Libro.find()
                .sort({ [sort]: sortDirecion })
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            totalRows = await Libro.find().count();
        }

        const pagesQuantity = Math.ceil(totalRows / pageSize);

        res.status(200).json({
            status: 200,
            pageSize,
            page,
            sort,
            sortDirecion,
            pagesQuantity,
            totalRows,
            data: libros,
        });
    } catch (err) {
        next(
            new ErrorResponse("No se pudo procesar el request" + err.message, 400)
        );
    }
};
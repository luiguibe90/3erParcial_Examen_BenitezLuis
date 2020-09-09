const Product = require('../models/product.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "contenido no puede estar vacio!"
        });
    }
    const product = new Product({
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        precioUnitario: req.body.precioUnitario,
        fechaIngreso: req.body.fechaIngreso
    });
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "han ocurrido algunos errores creando el producto."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products"
            });
        else res.send(data);
    });
};
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({
                    message: `not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al recuperar el producto con id" + req.params.productId
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Product.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind == "no econtrado") {
                res.status(404).send({
                    message: `Not found PRODUCTO WITH CODPRODUCTO ${REQ.PARAMS.productId}`
                });
            } else {
                res.status(509).send({
                    message: "No se pudo eliminar el cliente codigo: " + req.params.productId
                });
            }
        } else res.send({ message: `Producto elimnado satisfactoriamente!` });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Producto with codproducto ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

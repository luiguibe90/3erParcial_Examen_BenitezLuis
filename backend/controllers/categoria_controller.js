const Categoria = require('../models/categoria.js');
exports.findAll = (req, res) => {
    Categoria.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products"
            });
        else res.send(data);
    });
};
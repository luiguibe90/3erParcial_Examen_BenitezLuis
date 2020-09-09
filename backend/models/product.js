const sql = require('../util/database.js');



const Product = function (product) {
  this.nombre = product.nombre;
  this.cantidad = product.cantidad;
  this.precioUnitario = product.precioUnitario;
  this.fechaIngreso = product.fechaIngreso;

}
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO PRODUCTO SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("Producto Creado: ", { codProducto: res.insertcodProducto, ...newProduct });
    result(null, { codProducto: res.insertcodProducto, ...newProduct });
  });
};

Product.getAll = result => {
  sql.query("SELECT *FROM PRODUCTO", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }
    console.log("productos:", res);
    result(null, res);
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM PRODUCTO WHERE codProducto = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Producto encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM PRODUCTO WHERE CODPRODUCTO = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE producto SET nombre = ?, cantidad = ?, precioUnitario = ?, fechaIngreso = ? WHERE CODPRODUCTO = ?",
    [product.nombre, product.cantidad, product.precioUnitario, product.fechaIngreso, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};
module.exports = Product;
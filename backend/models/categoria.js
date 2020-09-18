const sql = require('../util/database.js');
const Categoria = function (Categoria) {
    this.cod_categoria = Cateogoria.cod_categoria;
    this.descripcion = Categoria.descripcion;
}
Categoria.getAll = (result) => {
    sql.query("select * FROM categoria ", (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      console.log("Categorias:", res);
      result(null, res);
    });
  };

  module.exports = Categoria;
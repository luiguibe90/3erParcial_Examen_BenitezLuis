const sql = require('../util/database.js');

const SubCategoria = function (SubCategoria) {
  this.COD_SUB_CATEGORIA =SubCategoria.COD_SUB_CATEGORIA;
  this.COD_CATEGORIA = SubCategoria.COD_CATEGORIA;
  this.NOMBRE = SubCategoria.NOMBRE;
  this.DESCRIPCION = SubCategoria.DESCRIPCION;
  this.FECHA_CREACION = SubCategoria.FECHA_CREACION;
}
SubCategoria.create = (newSubCategoria, result) => {
  sql.query("INSERT INTO subcategoria SET ?", newSubCategoria, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("SubCategoria Creada: ", { ...newSubCategoria });
    result(null, { ...newSubCategoria });
  });
};

SubCategoria.getAll = (cod_categoria,result) => {
  sql.query(`select sc.COD_SUB_CATEGORIA,sc.NOMBRE,sc.FECHA_CREACION FROM subcategoria sc
  INNER JOIN categoria c
  on sc.COD_CATEGORIA = c.COD_CATEGORIA
  where c.COD_CATEGORIA=${cod_categoria}`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }
    console.log("SubCategorias:", res);
    result(null, res);
  });
};

SubCategoria.findById = (cod_Sub_Categoria, result) => {
  sql.query(`SELECT * FROM subcategoria WHERE COD_SUB_CATEGORIA = ${cod_Sub_Categoria}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("SubCategoria encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

SubCategoria.remove = (id, result) => {
  sql.query("DELETE FROM subcategoria WHERE COD_SUB_CATEGORIA = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    // console.log("deleted subcategoria with id: ", id);
    // id2=id;
    // result(null, res,{ id2});
  });
};


module.exports = SubCategoria;
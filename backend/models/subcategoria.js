const sql = require('../util/database.js');



const subcategoria = function (subcategoria) {
  // this.cod_categoria = subcategoria.cod_categoria;
  // this.cod_subcategoria = subcategoria.cod_subcategoria; 
  this.nombre = subcategoria.nombre;
  this.descripcion = subcategoria.descripcion;
  this.fecha_creacion = subcategoria.fecha_creacion;

}
subcategoria.create = (newsubcategoria, result) => {
  sql.query("INSERT INTO SUBCATEGORIA SET ?", newsubcategoria, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("Subcategoria Creada con exito: ", { cod_subcategoria: res.insertcod_subcategoria, ...newsubcategoria });
    result(null, { cod_subcategoria: res.insertcod_subcategoria, ...newsubcategoria });
  });
};

subcategoria.getAll = (cod_categoria,result) => {
  sql.query(`select sc.COD_CATEGORIA,sc.NOMBRE,sc.FECHA_CREACION FROM subcategoria sc
  INNER JOIN categoria c
  on sc.COD_CATEGORIA = c.COD_CATEGORIA
  where c.COD_CATEGORIA=${cod_categoria}`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(null, err);
      return;
    }
    console.log("Sub Categoria:", res);
    result(null, res);
  });
};

subcategoria.findById = (cod_subcategoria, result) => {
  sql.query(`SELECT * FROM SUBCATEGORIA WHERE COD_SUB_CATEGORIA = ${cod_subcategoria}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("CATEGORIA NO ENCONTRADA: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

subcategoria.remove = (id, result) => {
  sql.query("DELETE FROM SUBCATEGORIA WHERE COD_SUB_CATEGORIA = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "CATEGORIA NO ENCONTRADA" }, null);
      return;
    }
    console.log("CATEGORIA ELIMINADA: ", id);
    result(null, res);
  });
};

module.exports = subcategoria;
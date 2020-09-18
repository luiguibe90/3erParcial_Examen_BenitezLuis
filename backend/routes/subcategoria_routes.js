module.exports=app=>{
const subcategoria = require("../controllers/subcategoria_controller.js");
const categoria = require("../controllers/categoria_controller");

  // app.post("/subcategoria/",subcategoria.create);  
  // app.get("/subcategoria/:cod_categoria", subcategoria.findAll);
  // app.get("/subcategoria/:cod_categoria", subcategoria.findOne);
  // app.delete("/subcategoria/:cod_categoria",subcategoria.delete);
  // app.get("/categorias",categoria.findAll);
  app.get("/subcategorias/:cod_categoria",subcategoria.findAll);  
      app.get("/subcategorias/:cod_sub_categoria",subcategoria.findOne);
      app.post("/subcategorias/",subcategoria.create);
      app.delete("/subcategorias/:cod_sub_categoria",subcategoria.delete);
      app.get("/categorias",categoria.findAll);
}
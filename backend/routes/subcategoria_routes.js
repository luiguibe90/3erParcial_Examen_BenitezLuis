module.exports=app=>{
const subcategoria = require("../controllers/subcategoria_controller.js");
  app.post("/subcategoria/:cod_sub_categoria/:cod_categoria",subcategoria.create);  
  app.get("/subcategoria/:cod_categoria", subcategoria.findAll);
  app.get("/subcategoria/:cod_categoria", subcategoria.findOne);
  app.delete("/subcategoria/:cod_categoria",subcategoria.delete);
  
}
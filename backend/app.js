// console.log("hola");
//const db = require('./util/database');
//const http= require('http');

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
/*const server = http.createServer((req, res)=>{
    console.log(req);
});


db.execute('SELECT * FROM PRODUCTO')
    .then(result => {
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });
server.listen(8000);

*/
// parse requests of content-type - application/json
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "EXAMEN PRACTICO WEB." });
});

//require("../backend/routes/products.js")(app);
require("../backend/routes/subcategoria_routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

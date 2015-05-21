var express = require("express");
var rotas = express.Router();

var contatoController = require("./controller/contatoController");
 

//rotas.all("*", contatoController.insert);
 
rotas.post("/insert", contatoController.insert);
rotas.get("/list", contatoController.list);
rotas.get("/:id([\\d]+)", contatoController.get);
rotas.put("/update/:id([\\d]+)", contatoController.update);
rotas.delete("/delete/:id(\\d+)", contatoController.delete);


//
rotas.use(function (req, res, next) {
	console.log("???");
	next(new Error("Não existe  rota  "));
});


module.exports = rotas;


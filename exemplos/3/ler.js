var fs = require("fs");



console.log("ler arquivo");

fs.readFile("./teste.txtx", function(err, conteudo){
	console.log("callback foi chamado");
	if(err){
		throw err;
	}
	console.log("conteudo do arquivo: " + conteudo);
});


console.log("esperando callback...");
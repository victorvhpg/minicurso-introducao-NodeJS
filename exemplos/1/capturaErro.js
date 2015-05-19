process.on("uncaughtException", function (err) {
	console.log("Erro: ", err);
	console.log("Stack:", err.stack);
	process.exit(1);
});


xxxxxx();

  

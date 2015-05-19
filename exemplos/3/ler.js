var fs = require("fs");



console.log("readFile");
fs.readFile("./teste.txt", function (err, conteudo) {
	console.log("readFile - callback foi chamado");
	if (err) {
		throw err;
	}
	console.log("conteudo do arquivo: " + conteudo);
	console.log("writeFile");
	fs.writeFile('teste2.txt', conteudo.toString() + " funcionou!", function (err) {
		if (err) {
			throw err;
		}
		console.log("writeFile - callback foi chamado");
	});

});



console.log("esperando callbacks...");

//
//function ler(arq) {
//	return new Promise(function (resolve, reject) {
//		fs.readFile(arq, function (err, conteudo) {
//			if (err) {
//				reject(err);
//				return;
//			}
//			resolve(conteudo);
//		});
//	});
//}
//
//
//ler("teste.txt").then(function (conteudo) {
//	console.log("PRO" + conteudo.toString());
//}).catch(function (err) {
//	console.log(err.message);
//});
//
//
//Promise.all([ler("teste.txt"), ler("teste2.txt")]).then(function (a) {
//	console.log(a[2].toString());
//	console.log(a[1].toString());
//}).catch(function (err) {
//	console.log(err.message);
//});

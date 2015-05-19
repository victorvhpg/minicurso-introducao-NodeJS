var fs = require('fs');
var r = fs.createReadStream('teste.txt');
var w = fs.createWriteStream("teste-out.txt");

r.setEncoding("utf-8");

r.on("data", function(buf) {
	console.log("data" , buf);  //+=
});


r.on("error", function(e) {
	console.log("ERRO" + e);
});


r.on("end", function() {
	//terminoui  de ler
	console.log("END");
});

r.pipe(w);

//  input.pipe(output) // retorna output

/*
require('http').createServer(function(req, res) {
	var rs = fs.createReadStream('/path/to/big/file');
	rs.pipe(res);
}).listen(8080);

*/

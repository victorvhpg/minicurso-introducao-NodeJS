var http = require("http");
var server = http.createServer(function (req, res) {

	console.log(req.headers);
	res.writeHead(200, {
		"Content-Type": "text/html;charset=utf-8"
	});
	if (req.url === "/teste") {
		res.write("Olá <strong>teste</strong>");
	} else {
		res.write("Olá <strong>HTTP</strong>!");
	}

	res.end("FIM");
});

server.listen(8000, function () {
	console.log("servidor rodando na porta 8000");
});








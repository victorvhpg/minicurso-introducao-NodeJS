var express = require("express");
var http = require("http");
var app = express();

app.use(function (req, resp, next) {
	console.log(req.url);
	//next("erro:::/");
	next();
	
});

 
app.use(function (err, req, resp, next) {
	console.log("Erro: "  + err);
	next();
}); 
 
 
http.createServer(app).listen(8000);
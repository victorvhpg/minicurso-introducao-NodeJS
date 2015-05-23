var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var chat = require("./controllers/chat");



//==============================================================================
//serve  os arquivos estaticos  //imagens,css, javascript, html
app.use(express.static(__dirname + "/public"));

//portas  dos servidores
var portaServidorHTTP = 8000;
var portaServidorWebSocket = 9090;

//cria um servidor Web  HTTP
var server = http.createServer(app);
server.listen(portaServidorHTTP, function() {
	console.log("servidor HTTP  rodando  na porta: " + portaServidorHTTP);
});

//cria um servidor WebSockect
var wss = new WebSocketServer({
	port: portaServidorWebSocket
});
//================================================================================

//===============inicia o chat
chat.init(wss);

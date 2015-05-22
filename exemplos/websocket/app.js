var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();



//================================================================================
//serve  os arquivos estaticos  //imagens,css, javascript, html
app.use(express.static(__dirname + "/public"));

//portas  dos servidores
var portaServidorHTTP = 8000;
var portaServidorWebSocket = 9090;

//cria um servidor Web  HTTP
var server = http.createServer(app);
server.listen(portaServidorHTTP, function () {
  console.log("servidor HTTP  rodando  na porta: " + portaServidorHTTP);
});

//cria um servidor WebSockect
var wss = new WebSocketServer({ port: portaServidorWebSocket });
//================================================================================



//metodo que envia para todos os usuarios
wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};


// evento connection eh  executado 
//todo  vez que  um  novo  usuario abre  um socket
wss.on("connection", function (ws) {
  
  //ws eh o socket  do  usuario que  se conectou
  console.log("usuario  conectou");

  //evento  qdo  recebe   alguma  msg  do  usuario
  ws.on("message", function (message) {
    console.log("recebeu : " + message);  
    //teste
    wss.broadcast("usuario enviou: " + message);
  
  
  });

  //
  ws.send("oi  voce concetou no ws");
  
  //envia  para  todos os  usuarios conectados
  wss.broadcast("alguem  enttrou");



  ws.on("close", function () {
    console.log("usuario FECHOU");
  });

});

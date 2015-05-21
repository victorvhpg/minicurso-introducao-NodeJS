var WebSocketServer = require("ws").Server
  , http = require("http")
  , express = require("express")
  , app = express();



app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

server.listen(8000, function () {
  console.log("servidor  8000");
});

var wss = new WebSocketServer({ port: 8080 });

wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};

//recebe cliente
wss.on("connection", function (ws) {
  console.log("cliente  conectou");


  ws.on("message", function (message) {
    console.log("recebeu : " + message);
  });


  ws.send("OI");
  wss.broadcast("alguem  enttrou");
 
 

  ws.on("close", function () {
    console.log(" fFECHOU");
  });

});

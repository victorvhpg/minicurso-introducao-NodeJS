var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var usuarioController = require("./controllers/usuarioController");



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

//=======================================================
//metodo que envia para todos os clientes
wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(JSON.stringify(data));
  });
};


var todasConexoes = {};

//=======================================================
var recebeMsg = function (dados) {
  var objUsuarioQueEnviou = usuarioController.getUsuario(dados.id);
  var msg = dados.msg;
  var idPara = dados.idPara;
  var dadosEnviar = {
    acao: "recebeMsg",
    msg: "Usuario [" + objUsuarioQueEnviou.usuario + "] enviou: " + msg
  };

  if (idPara == 0) {
    //envia  para  todos os  usuarios conectados
    wss.broadcast(dadosEnviar);
  } else {
    //envia apenas para  um
    todasConexoes[idPara].send(JSON.stringify(dadosEnviar));      
    //e para  o proprio user
    todasConexoes[objUsuarioQueEnviou.id].send(JSON.stringify(dadosEnviar));
  }
};



//=======================================================
var usuarioEntrou = function (ws, dados) {
  console.log(dados.usuario);
  var objUser = usuarioController.addUsuario({
    usuario: dados.usuario
  });
  todasConexoes[objUser.id] = ws;  
  //envia  o id  para o usuario
  ws.send(JSON.stringify({
    acao: "setarId",
    id: objUser.id,
    listaDeUsuarios: usuarioController.getUsuarios()
  }));
  //envia  para  todos os  usuarios conectados
  wss.broadcast({
    acao: "recebeMsg",
    msg: "Usuario [" + objUser.usuario + "] entrou  no  chat"
  });
  wss.broadcast({
    acao: "adicionaUsuarioNalista",
    objUsuario: objUser
  });

  return objUser;

};



//===========================================
// evento connection eh  executado 
//todo  vez que  um  novo  usuario abre  um socket
wss.on("connection", function (ws) {

  console.log("Abriu  conexao ");
  var objUser = null;
  
  //evento  qdo  recebe   alguma  msg  do  cliente
  ws.on("message", function (dados) {
    dados = JSON.parse(dados);
    var acao = dados.acao;
    console.log("acao=" + acao);
    if (acao == "entrar") {
      objUser = usuarioEntrou(ws, dados);
    } else if (acao == "enviarMsg") {
      recebeMsg(dados);
    }
  });
  //===
  ws.on("close", function () {
    console.log("close");
    if (objUser) {
      console.log("close: " + objUser.id);
      usuarioController.removeUsuario(objUser);
      wss.broadcast({
        acao: "removeUsuarioDaLista",
        idRemove: objUser.id
      });
    }
  });

});

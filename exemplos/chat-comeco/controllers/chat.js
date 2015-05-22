var usuarioController = require("./usuarioController");
//=====================
var chat = {
  wss: null,
 

  enviaParaTodos: function (dados) {
    //=======================================================
    //metodo que envia para todos os clientes  
    chat.wss.clients.forEach(function (client) {
      client.send(JSON.stringify(dados));
    });
  },

  recebeMsg: function (dados) {
    var objUsuarioQueEnviou = usuarioController.getUsuario(dados.id);
    var msg = dados.msg;
    // var idPara = dados.idPara;
    var dadosEnviar = {
      acao: "recebeMsg",
      msg: "Usuario [" + objUsuarioQueEnviou.usuario + "] enviou: " + msg
    };
    
    //envia  para  todos os  usuarios conectados
    this.enviaParaTodos(dadosEnviar);

  },

  usuarioEntrou: function (ws, dados) {
    var objUser = usuarioController.addUsuario({
      usuario: dados.usuario
    });
 
    //envia  o id  para o usuario
    ws.send(JSON.stringify({
      acao: "setarId",
      id: objUser.id,
      listaDeUsuarios: usuarioController.getUsuarios()
    }));
    //envia  para  todos os  usuarios conectados
    this.enviaParaTodos({
      acao: "recebeMsg",
      msg: "Usuario [" + objUser.usuario + "] entrou  no  chat"
    });
    //add  lista
     //...
     
    return objUser;
  },

  aoReceberConexao: function (ws) {
    console.log("Abriu  conexao ");
    var objUser = null;  
    //evento  qdo  recebe   alguma  msg  do  cliente
    ws.on("message", function (dados) {
      dados = JSON.parse(dados);
      var acao = dados.acao;
      console.log("acao=" + acao);
      if (acao == "entrar") {
        objUser = chat.usuarioEntrou(ws, dados);
      } else if (acao == "enviarMsg") {
        chat.recebeMsg(dados);
      }
    });
 
    //ao fechar
    ws.on("close", function () {
      console.log("close");
      if (objUser) {
        console.log("close: " + objUser.id);

      }
    });
  },

  init: function (wss) {
    this.wss = wss;        
    //===========================================
    // evento connection eh  executado 
    //todo  vez que  um  novo  usuario abre  um socket
    this.wss.on("connection", function (ws) {
      chat.aoReceberConexao(ws);
    });
  }
};






module.exports = chat;
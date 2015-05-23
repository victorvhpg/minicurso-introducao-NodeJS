var chat = (function() {
    "use strict";

    var _id = 0;
    var _idPara = 0; //para todos


    var chat = {


        socket: null,
        view: null,

        initView: function() {
            this.view = {
                status: document.getElementById("status"),
                btnConectar: document.getElementById("btnConectar"),
                btnFechar: document.getElementById("btnFechar"),
                btnEnviar: document.getElementById("btnEnviar"),
                txtMsg: document.getElementById("txtMsg"),
                divResposta: document.getElementById("divResposta"),
                txtUsuario: document.getElementById("txtUsuario"),
                listaDeUsuarios: document.getElementById("listaDeUsuarios"),
                falandoCom: document.getElementById("falandoCom")
            };
        },

        enviarMsg: function() {
            if (chat.view.txtMsg.value.trim() === "") {
                chat.view.txtMsg.value = "-";
            }
            chat.socket.send(JSON.stringify({
                id: _id,
                idPara: _idPara,
                acao: "enviarMsg",
                msg: chat.view.txtMsg.value
            }));
            chat.view.txtMsg.value = "";
        },

        entrarNoChat: function() {
            chat.socket.send(JSON.stringify({
                acao: "entrar",
                usuario: chat.view.txtUsuario.value
            }));
        },

        setConversarCom: function(user) {
            _idPara = user.id;
            chat.view.falandoCom.innerHTML = user.usuario;
            chat.view.divResposta.innerHTML = "";
        },

        removeUsuarioDaLista: function(id) {
            var li = chat.view.listaDeUsuarios.querySelector("[data-id='" + id + "']");
            if (li) {
                li.parentNode.removeChild(li);
            }
        },

        addNaLista: function(user) {
            var li = document.createElement("li");
            li.setAttribute("data-id", user.id);
            li.innerHTML = user.usuario;
            li.addEventListener("click", function() {
                chat.setConversarCom(user);
            });
            chat.view.listaDeUsuarios.appendChild(li);
        },

        setarId: function(dados) {
            _id = dados.id;
            //desabilita  botoes
            chat.view.txtUsuario.disabled = true;
            chat.view.btnConectar.disabled = true;
            //carrega  a  lista  de  usuarios  online
            chat.view.listaDeUsuarios.innerHTML = "";
            dados.listaDeUsuarios.forEach(function(user) {
                chat.addNaLista(user);
            });
        },

        recebeMsg: function(dados) {
            chat.view.divResposta.innerHTML = dados.msg + "<hr />" + chat.view.divResposta.innerHTML;
        },

        init: function() {
            chat.initView();
            chat.view.status.innerHTML = "NAO Conectado";
            chat.view.btnFechar.disabled = true;
            chat.view.btnEnviar.disabled = true;


            // CONECTAR
            chat.view.btnConectar.addEventListener("click", function(event) {

                if (chat.view.txtUsuario.value.trim() === "") {
                    alert("informe o  usuário");
                    return false;
                }

                //abrir  sockect
                chat.socket = new WebSocket("ws://localhost:9090");


                //ao  abrir sockect
                chat.socket.addEventListener("open", function(event) {
                    chat.view.btnFechar.disabled = false;
                    chat.view.btnEnviar.disabled = false;
                    chat.view.status.innerHTML = "Conectado";
                    chat.entrarNoChat();
                });

                //ao  receber  mensagem  do  servidor
                chat.socket.addEventListener("message", function(event) {
                    var dados = JSON.parse(event.data);
                    var acao = dados.acao;
                    console.log("recebeu  acao=" + acao);
                    if (acao === "setarId") {
                        chat.setarId(dados);
                    } else if (acao === "recebeMsg") {
                        chat.recebeMsg(dados);
                    } else if (acao === "adicionaUsuarioNalista" &&
                        dados.objUsuario.id !== _id) {
                        chat.addNaLista(dados.objUsuario);
                    } else if (acao === "removeUsuarioDaLista") {
                        chat.removeUsuarioDaLista(dados.idRemove);
                    }
                });

                //quando  ocorre orre no chat.socket
                chat.socket.addEventListener("error", function(event) {
                    chat.view.divResposta.innerHTML = "Erro: " + event;
                });

                //quando fecha  o chat.socket  usuario
                chat.socket.addEventListener("close", function(event) {
                    chat.view.btnConectar.disabled = false;
                    chat.view.txtUsuario.disabled = false;
                    status.innerHTML = "NAO Conectado";
                });
            });

            // btn  fechar  sockect
            chat.view.btnFechar.addEventListener("click", function(event) {
                chat.view.btnFechar.disabled = true;
                chat.view.btnEnviar.disabled = true;
                chat.view.divResposta.innerHTML = "";
                chat.socket.close();
            });

            // btn  enviar   mensagem
            chat.view.btnEnviar.addEventListener("click", function(event) {
                chat.enviarMsg();

            });

        }
    };

    return chat;
})();

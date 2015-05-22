"use strict";

window.addEventListener("DOMContentLoaded", function (event) {
	var status = document.getElementById("status");
	var btnConectar = document.getElementById("btnConectar");
	var btnFechar = document.getElementById("btnFechar");
	var btnEnviar = document.getElementById("btnEnviar");
	var txtMsg = document.getElementById("txtMsg");
	var divResposta = document.getElementById("divResposta");
	var txtUsuario = document.getElementById("txtUsuario");
	var listaDeUsuarios = document.getElementById("listaDeUsuarios");
	var falandoCom = document.getElementById("falandoCom");
	var socket;

	var _id = 0;
	var _idPara = 0; //para todos

	status.innerHTML = "NAO Conectado";
	btnFechar.disabled = true;
	btnEnviar.disabled = true;



	var entrarNoChat = function () {
		socket.send(JSON.stringify({
			acao: "entrar",
			usuario: txtUsuario.value
		}));
	};

	var enviarMsg = function () {
		socket.send(JSON.stringify({
			id: _id,
			idPara: _idPara,
			acao: "enviarMsg",
			msg: txtMsg.value
		}));
		txtMsg.value = "";
	};

	var setConversarCom = function (user) {
		_idPara = user.id;
		falandoCom.innerHTML = user.usuario;
		divResposta.innerHTML = "";
	};

	var removeUsuarioDaLista = function (id) {
		var li = listaDeUsuarios.querySelector("[data-id='" + id + "']");
		if (li) {
			li.parentNode.removeChild(li);
		}
	};

	var addNaLista = function (user) {
		if (user.id == _id) {
			return;
		}
		var li = document.createElement("li");
		li.setAttribute("data-id", user.id);
		li.innerHTML = user.usuario;
		li.addEventListener("click", function () {
			setConversarCom(user);
		});

		listaDeUsuarios.appendChild(li);
	};

	var setarId = function (dados) {
		_id = dados.id;
		//desabilita  botoes
		txtUsuario.disabled = true;
		btnConectar.disabled = true;
		//carrega  a  lista  de  usuarios  online
		listaDeUsuarios.innerHTML = "";
		dados.listaDeUsuarios.forEach(function (user) {
			addNaLista(user);
		});
	};

	var recebeMsg = function (dados) {
		divResposta.innerHTML = dados.msg + "<hr />" + divResposta.innerHTML;
	};
	//=======================================================
	
			
	// CONECTAR
	btnConectar.addEventListener("click", function (event) {

		if (txtUsuario.value.trim() == "") {
			alert("informe o  usuário");
			return false;
		}
		
		
		
		//abrir  sockect
		socket = new WebSocket("ws://localhost:9090");
		
	 
		//ao  abrir sockect
		socket.addEventListener("open", function (event) {
			btnFechar.disabled = false;
			btnEnviar.disabled = false;
			status.innerHTML = "Conectado";
			entrarNoChat();
		});
		 
		//ao  receber  mensagem  do  servidor
		socket.addEventListener("message", function (event) {
			var dados = JSON.parse(event.data);
			var acao = dados.acao;
			console.log("recebeu  acao=" + acao);
			if (acao == "setarId") {
				setarId(dados);
			} else if (acao == "recebeMsg") {
				recebeMsg(dados);
			} else if (acao == "adicionaUsuarioNalista") {

				addNaLista(dados.objUsuario);

			} else if (acao == "removeUsuarioDaLista") {
				removeUsuarioDaLista(dados.idRemove);
			}
		});
		
		//quando  ocorre orre no socket
		socket.addEventListener("error", function (event) {
			divResposta.innerHTML = "Erro: " + event;
		});
		
		//quando fecha  o socket  usuario  
		socket.addEventListener("close", function (event) {
			btnConectar.disabled = false;
			txtUsuario.disabled = false;
			status.innerHTML = "NAO Conectado";
		});
	});
	
	
	
 
	
	// btn  fechar  sockect
	btnFechar.addEventListener("click", function (event) {
		btnFechar.disabled = true;
		btnEnviar.disabled = true;
		divResposta.innerHTML = "";
		socket.close();
	});
	
	// btn  enviar   mensagem  
	btnEnviar.addEventListener("click", function (event) {
		enviarMsg();

	});
});
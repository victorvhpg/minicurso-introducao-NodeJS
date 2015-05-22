"use strict";
 
window.addEventListener("DOMContentLoaded", function (event) {
	var status = document.getElementById("status");
	var btnConectar = document.getElementById("btnConectar");
	var btnFechar = document.getElementById("btnFechar");
	var btnEnviar = document.getElementById("btnEnviar");
	var txtMsg = document.getElementById("txtMsg");
	var divResposta = document.getElementById("divResposta");
	var socket;
	
	
	
	status.innerHTML = "NAO Conectado";
	btnFechar.disabled = true;
	btnEnviar.disabled = true;
	// Create a new connection when the Connect button is clicked
	btnConectar.addEventListener("click", function (event) {
		btnConectar.disabled = true;
		
		//abrir  sockect
		socket = new WebSocket("ws://localhost:9090");
		
		
		//ao  abrir sockect
		socket.addEventListener("open", function (event) {
			btnFechar.disabled = false;
			btnEnviar.disabled = false;
			status.innerHTML = "Conectado";
		});
		 
		//ao  receber  mensagem  do  servidot
		socket.addEventListener("message", function (event) {
			console.log(event);
			divResposta.innerHTML   += "<br />servidor  enviou: " + event.data;
		});
		
		//quando  ocorre orre no socket
		socket.addEventListener("error", function (event) {
			divResposta.innerHTML = "Error: " + event;
		});
		
		//quando fecha  o socket  usuario  
		socket.addEventListener("close", function (event) {
			btnConectar.disabled = false;
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
		socket.send(txtMsg.value);
		txtMsg.value = "";
	});
});
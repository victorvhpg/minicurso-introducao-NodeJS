"use strict";
 
window.addEventListener("DOMContentLoaded", function (event) {
	var status = document.getElementById("status");
	var open = document.getElementById("open");
	var close = document.getElementById("close");
	var send = document.getElementById("send");
	var text = document.getElementById("text");
	var message = document.getElementById("message");
	var socket;
	status.textContent = "Not Connected";
	close.disabled = true;
	send.disabled = true;
	// Create a new connection when the Connect button is clicked
	open.addEventListener("click", function (event) {
		open.disabled = true;
		socket = new WebSocket("ws://localhost:8080");
		socket.addEventListener("open", function (event) {
			close.disabled = false;
			send.disabled = false;
			status.textContent = "Connected";
		});
		 
		// Display messages received from the server
		socket.addEventListener("message", function (event) {
			message.innerHTML   += "<br />Server Says: " + event.data;
		});
		// Display any errors that occur
		socket.addEventListener("error", function (event) {
			message.textContent = "Error: " + event;
		});
		socket.addEventListener("close", function (event) {
			open.disabled = false;
			status.textContent = "Not Connected";
		});
	});
	// Close the connection when the Disconnect button is clicked
	close.addEventListener("click", function (event) {
		close.disabled = true;
		send.disabled = true;
		message.innerHTML = "";
		socket.close();
	});
	// Send text to the server when the Send button is clicked
	send.addEventListener("click", function (event) {
		socket.send(text.value);
		text.value = "";
	});
});
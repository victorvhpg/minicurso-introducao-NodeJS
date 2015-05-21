var Contato = require("../model/Contato");
var fs = require("fs");
//le os dados e deixa na  memoria
var _listContatos = require("../dados/contatos.json").map(function (obj) {
	return new Contato(obj);
});



var _atualizaDados = function () {
	return new Promise(function (resolve, reject) {
		var w = fs.createWriteStream(__dirname + "/../dados/contatos.json");
		w.on("finish", function () {
			resolve();
		});
		w.on("error", function (err) {
			reject(err);
		});
		w.end(JSON.stringify(_listContatos));
	});
};


var contatoDAO = {


	insert: function (nome) {
		return new Promise(function (resolve, reject) {
			if (!nome) {
				reject(new Error("Por favor informe um nome"));
				return;
			}
			//adiciona
			var c = new Contato({
				id: _listContatos.length + 1,
				nome: nome
			});
			_listContatos.push(c);
			//atualiza a base dados
			_atualizaDados().then(function () {
				resolve(c);
			}).catch(reject);
		});
	},

	get: function (id) {
		console.log("GET " + id);
		//usando  promise para simular  uma  operacao async 
		return new Promise(function (resolve, reject) {
			for (var i = 0; i < _listContatos.length; i++) {
				if (_listContatos[i].id === id) {
					resolve(_listContatos[i]);
					return;
				}
			}
			reject(new Error("Nao encontrado"));
		});
	},  

	delete: function (id) {
		//usando  promise para simular  uma  operacao async 
		return new Promise(function (resolve, reject) {
			for (var i = 0; i < _listContatos.length; i++) {
				if (_listContatos[i].id === id) {
					_listContatos.splice(i, 1);//remove da  lista
					//atualiza a base dados
					_atualizaDados().then(resolve).catch(reject);
					return;
				}
			}
			console.log("::??");
			reject(new Error("Nao encontrado"));
		});
	},

    update: function (id, nome) {
		return new Promise(function (resolve, reject) {
			if (!nome) {
				reject(new Error("Por favor informe um nome"));
				return;
			}
			contatoDAO.get(id).then(function (obj) {
				//atualiza
				obj.nome = nome;
				//atualiza a base dados
				_atualizaDados().then(function () {
					resolve(obj);
				}).catch(reject);

			}).catch(function () {
				reject(new Error("Nao encontrado"));
			});
		});
	},

	getList: function () {
		return _listContatos;
	}
};


module.exports = contatoDAO;
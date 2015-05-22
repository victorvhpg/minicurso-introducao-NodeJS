

var _listaUsuarios = [];

var chatController = {

	getUsuarios: function () {
		return _listaUsuarios;
	},

	addUsuario: function (userName, ws) {
		_listaUsuarios.push(objUsuario);
	},

	removeUsuario: function (objUsuario) {
		for (var i = 0; i < _listaUsuarios.length; i++) {
			if (objUsuario.id === _listaUsuarios[i].id) {
				_listaUsuarios.splice(i, 1);//remove da  lista
				return true;
			}
		}
		return false;
	}

};


module.exports = chatController;
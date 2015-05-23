var Usuario = require("../model/Usuario");

var _listaUsuarios = [];
var _ids = 0;



var usuarioController = {

    getUsuario: function(id) {
        for (var i = 0; i < _listaUsuarios.length; i++) {
            if (_listaUsuarios[i].id === id) {
                return _listaUsuarios[i];
            }
        }
        return false;
    },

    gerarId: function() {
        _ids++;
        return _ids;
    },

    getUsuarios: function() {
        return _listaUsuarios;
    },

    addUsuario: function(obj) {
        var obj = new Usuario({
            usuario: obj.usuario,
            id: this.gerarId()
        });
        _listaUsuarios.push(obj);
        return obj;
    },

    removeUsuario: function(objUsuario) {
        for (var i = 0; i < _listaUsuarios.length; i++) {
            if (objUsuario.id === _listaUsuarios[i].id) {
                _listaUsuarios.splice(i, 1); //remove da  lista
                return true;
            }
        }
        return false;
    }

};


module.exports = usuarioController;

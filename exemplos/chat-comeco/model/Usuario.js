var  Usuario = function (config) {
	this.id = config.id || 1 ;
	this.usuario = config.usuario;
};

module.exports = Usuario;

var MeuModuloComPrototype = function () {
	this.teste = "teste....";
};

MeuModuloComPrototype.prototype.fazAlgo = function () {
	return this.teste;
};

MeuModuloComPrototype.prototype.fazAlgoDiferente = function () {
	return "fazAlgoDiferente";
};

module.exports = MeuModuloComPrototype; 
 
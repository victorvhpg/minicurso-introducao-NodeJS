var Contato = function(config) {
    this.nome = config.nome || "FULANO";
    this.id = config.id || Date.now();
};

module.exports = Contato;

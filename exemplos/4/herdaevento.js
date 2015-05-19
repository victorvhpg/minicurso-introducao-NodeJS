var EventEmitter = require("events").EventEmitter;
var inherits = require("util").inherits;

function Pessoa() {
	EventEmitter.call(this);
}
inherits(Pessoa, EventEmitter);

Pessoa.prototype.teste = function() {
	this.emit("teste");
};


var p = new Pessoa();
 
p.on("teste", function() {
	console.log("teste!");
});
 
p.teste();


/*
inherits = function(ctor, superCtor) {
	ctor.super_ = superCtor;
	ctor.prototype = Object.create(superCtor.prototype, {
		constructor: {
			value: ctor,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
};
*/
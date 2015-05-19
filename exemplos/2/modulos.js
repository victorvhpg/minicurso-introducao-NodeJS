
var fs = require("fs"); //modulo  nativo
var moduloA = require("moduloA"); //modulo que esta na pasta node_modules
var nomeDoModulo = require("./teste/teste2/nomeDoModulo"); // caminho  relativo

var meuModulo = require("./meuModulo");// caminho  relativo

var MeuModuloComPrototype = require("./MeuModuloComPrototype");

var obj =  new MeuModuloComPrototype();

console.log(obj.fazAlgo());

console.log(meuModulo.fazAlgo() + "?");


                

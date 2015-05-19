var EventEmitter = require("events").EventEmitter;

var objEmitter = new EventEmitter();

objEmitter.on("fezAlgo", function(a, b, c) {
  console.log(a+b+c);
});


// Emit
objEmitter.emit("fezAlgo", "aaa" , "bbb" , "ccc");

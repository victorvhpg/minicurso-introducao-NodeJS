setTimeout(function () {
	console.log("sera  executado  após  5 segundos");
}, 5000);
console.log("iniciou.....____");


//CTRL+C
process.on("SIGINT", function () {
	console.log("Got SIGINT. Ignoring.");
	process.exit(0);
}); 

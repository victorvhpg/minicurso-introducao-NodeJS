var fs = require("fs");
var domain = require("domain").create();

domain.run(function () {
	setTimeout(function () {
		throw new Error(2);

	}, 2000);
});

domain.on("error", function (error) {
	console.log("The exception was caught!" + error)
}); 
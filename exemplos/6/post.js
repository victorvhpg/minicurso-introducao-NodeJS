var http = require("http");
var qs = require("querystring");
var body = qs.stringify({
	teste: "aaa",
	xxx: "xxxxxxx"
});

console.log(body);

var request = http.request({
	hostname: "localhost",
	port: 8000,
	path: "/",
	method: "POST",
	headers: {
		"User-Agent" : "navegador node",
		// "Host": "localhost:8000",
		"Content-Type": "application/x-www-form-urlencoded",
		"Content-Length": Buffer.byteLength(body)
	}
}, function (response) {
		response.setEncoding("utf8");

		response.on("data", function (data) {
			process.stdout.write(data);
		});

		response.on("end", function () {
			console.log( "end" );
		});
	});

request.end(body);
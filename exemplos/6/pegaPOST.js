var http = require("http");
var qs = require("querystring");
var server = http.createServer(function (req, resp) {
	var bodyString = "";

	req.setEncoding("utf8");

	req.on("data", function (data) {
		bodyString += data;
	});

	req.on("end", function () {
		var body = qs.parse(bodyString);

		for (var b in body) {
			resp.write(b + ' = ' + body[b] + "\n");
		}

		resp.end();
	});
});

server.listen(8000);
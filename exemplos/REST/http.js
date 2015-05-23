var http = require("http");
var qs = require("querystring");
var url = require("url");







var post = function(urlDestino, parametrosPost, metodo) {
    var body = qs.stringify(parametrosPost);
    var u = url.parse(urlDestino);

    var request = http.request({
        hostname: u.hostname,
        port: u.port,
        path: u.path,
        method: metodo || "POST",
        headers: {
            "User-Agent": "navegador node",
            // "Host": "localhost:8000",
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(body)
        }
    }, function(res) {
        var resposta = "";
        console.log("STATUS: " + res.statusCode + "\n");

        console.log("HEADERS: " + JSON.stringify(res.headers, null, 2) + "\n");


        res.setEncoding("utf8");

        res.on("data", function(data) {
            resposta += data;
        });

        res.on("end", function() {

            console.log("RESPOSTA: " + JSON.stringify(JSON.parse(resposta), null, 2) + "\n");
        });
    });
    request.end(body);
};

var get = function(urlDestino) {


    var u = url.parse(urlDestino);

    var request = http.get({
        hostname: u.hostname,
        port: u.port,
        path: u.path
    }, function(res) {
        var resposta = "";
        console.log("STATUS: " + res.statusCode + "\n");

        console.log("HEADERS: " + JSON.stringify(res.headers, null, 2) + "\n");


        res.setEncoding("utf8");

        res.on("data", function(data) {
            resposta += data;
        });

        res.on("end", function() {
            console.log("RESPOSTA: " + JSON.stringify(JSON.parse(resposta), null, 2) + "\n");

        });
    });
    request.end();
};


var put = function(urlDestino, parametrosPost) {
    post(urlDestino, parametrosPost, "PUT");
};

var del = function(urlDestino, parametrosPost) {
    post(urlDestino, parametrosPost, "DELETE");
};

//=================================
/*
	 post("http://localhost:8000/api/contato/insert", {
		nome: "pessoa "
	});
	*/
/*
	get("http://localhost:8000/api/contato/list");

 */

/*
	put("http://localhost:8000/api/contato/update/2", {
		 nome: "teste "
	});
*/
/* get("http://localhost:8000/api/contato/533");

*/
/*
 	del("http://localhost:8000/api/contato/delete/1"); */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var http = require("http");
var rotas = require("./rotas");
//=============================================


app.use(bodyParser.urlencoded({
    extended: false
}));



app.use("/api/contato/", rotas);




app.use(function(req, res, next) {
    var err = new Error("Nao  encontrou");
    err.status = 404;
    next(err);
});



app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});



http.createServer(app).listen(8000, function() {
    console.log("rodando a  api REST");
});

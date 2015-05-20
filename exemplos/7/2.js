var express = require("express");
var http = require("http");
var app = express();
app.get("/", function (req, res, next) {
  res.send("  home ....");

});
app.get("/a", function (req, res, next) {
  res.send("aaa");
});
app.get("/a/:id", function (req, res, next) {
  res.send("id " + req.params.id);
});
app.get("/b", function (req, res, next) {
  res.send("bbbb");
});
//app.   get/post/delete/put/ all
//opcionall  :id?
// 
app.get("/produto/:id(\\d+)", function (req, res, next) {
  res.send("id " + req.params.id);
});
 
//ou
app.route("/book").get(function (req, res) {
  res.send("Get a random book");
}).post(function (req, res) {
  res.send("Add a book");
}).put(function (req, res) {
  res.send("Update the book");
});
//==========
//ou
var router = express.Router();
//o router tb  pode usar middleware
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
 
router.get("/rota", function(req, res, next) {
  //res.render("index", { title: "Express" });
    res.send("  home ....");
});


//ERROS
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('errooo!');
});

http.createServer(app).listen(8000);
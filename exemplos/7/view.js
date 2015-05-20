var express = require("express");
var http = require("http");
var app = express();
var router = express.Router();
var path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//o router tb  pode usar middleware
router.use(function timeLog(req, res, next) {
  console.log("timestamp: ", Date.now());
  next();
});

router.use(express.static(path.join(__dirname, "views", "p")));


router.route('/livro')
  .get(function (req, res) {
  res.send(' aaaaaaaaa');
})
  .post(function (req, res) {
  res.send('bbbbbbbbb');
})
  .put(function (req, res) {
  res.send('ccccccccccc');
});


router.get("/", function (req, res, next) {
  
  res.render("index", { msg: "pagina inicial", dados: ["nomeA", "nomeB", "nomeC" + req.query.teste] });
});


router.get("/a/:id", function (req, res, next) {
  res.render("index", { msg: "pagina inicial" });
});

 
//query string 
//var user_id = req.param('id');
//  var token = req.param('token');
//  var geo = req.param('geo');  

app.use("/", router);

//ERROS
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("errooo!");
});

http.createServer(app).listen(8000);
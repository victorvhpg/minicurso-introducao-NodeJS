var contatoDAO = require("../dao/contatoDAO");



var contatoController = {

	insert: function (req, res, next) {

		console.log("contatoController.insert");
		var nome = req.body.nome;

		contatoDAO.insert(nome).then(function (obj) {
			console.log("contatoController.insert sucesso");
			res.status(200).json({
				msg: "adicionado com sucesso : id = " + obj.id
			});
		}).catch(function (err) {
			console.log("contatoController.insert erro" + err.message);
			res.status(400).json({
				msg: err.message
			});
		});

	},

	get: function (req, res, next) {
		console.log("contatoController.get");

        var id = parseInt(req.params.id, 10);
	 

		contatoDAO.get(id).then(function (obj) {
			console.log("contatoController.get sucesso");
			res.json(obj);
		}).catch(function (err) {
			console.log("contatoController.get erro");
			res.status(400).json({
				msg: "nao encontrou id "
			});
		});
	},

	delete: function (req, res, next) {
		console.log("contatoController.delete");

        var id = parseInt(req.params.id, 10);
		console.log(typeof id);

		contatoDAO.delete(id).then(function (obj) {
			console.log("contatoController.delete sucesso");
			res.json({
				msg: "delete com sucesso   "
			});
		}).catch(function (err) {

			res.status(400).json({
				msg: err.message 
			});
		}).catch(function (err) {
			console.log("erro  ao tentar enviar erro");
			next(err);
		});
	},

    update: function (req, res, next) {
		console.log("contatoController.update");
		var nome = req.body.nome;
        var id = parseInt(req.params.id, 10);
		console.log(typeof id);

		contatoDAO.update(id, nome).then(function (obj) {
			console.log("contatoController.update sucesso");
			res.json({
				msg: "update com sucesso : nome = " + obj.nome
			});
		}).catch(function (err) {
			console.log("contatoController.update erro" + err.message);
			res.status(400).json({
				msg: err.message
			});
		});
	},

	list: function (req, res, next) {
		res.status(200).json(contatoDAO.getList());
	}
};


module.exports = contatoController;
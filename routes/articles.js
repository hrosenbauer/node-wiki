var path = require('path'),
	db = require(path.join(__dirname, '..', 'libs', 'db')),
	config = require(path.join(__dirname, '..', 'config')).wiki;

exports.index = function (req, res) {
	res.redirect('/' + config.startpage);
};

exports.view = function (req, res) {
	var id = db.id(req.params.id);

	// make sure url is valid
	if (id !== req.params.id)
		res.redirect('/' + id);

	db.read(id, function (article) {
		var empty = !article;

		if (empty) {
			article = {
				id: id,
				title: 'Page not found',
				content: ''
			};
		}

		res.render('view', {
			article: article,
			empty: empty
		});
	});
};

exports.update = function (req, res) {
	var article = {
		id: req.params.id,
		title: req.body.title,
		content: req.body.content
	};

	db.store(article, function (id) {
		res.redirect('/' + id);
	});
};

exports.remove = function (req, res) {
	db.remove(req.params.id);
	res.redirect('/');
};

module.exports = exports;

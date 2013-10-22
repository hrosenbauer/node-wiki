var path = require('path'),
    db = require(path.join(__dirname, '..', 'libs', 'db')),
	config = require(path.join(__dirname, '..', 'config')).wiki;

exports.index = function (req, res) {
	res.redirect('/' + config.startpage);
};

exports.id = function (req, res, next) {
    var urlId = req.param('id'),
        id = db.id(urlId);

    if (urlId !== id)
        return res.redirect('/' + id);

    next();
};

exports.view = function (req, res) {
	var id = req.param('id');

	db.read(id, function (article) {
        var empty = !article;
		if (empty) {
			article = {
				id: id,
				title: '',
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
		id: req.param('id'),
		title: req.param('title'),
		content: req.param('content')
	};

	db.store(article, function (article) {
		res.redirect('/' + article.id);
	});
};

exports.remove = function (req, res) {
	db.remove(req.param('id'));
	res.redirect('/');
};

module.exports = exports;

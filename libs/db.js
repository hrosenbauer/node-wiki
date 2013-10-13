var path = require('path'),
	config = require(path.join(__dirname, '..', 'config')).db,
	dblite = require('dblite'),
	db;

dblite.bin = config.sqlite;
db = dblite(config.file);

// generate url-safe id from title
exports.id = function (title) {
	var id = title.trim().toLowerCase();
	id = id.replace(/\s+/g, '-');
	id = id.replace(/[^a-zA-Z0-9\-]/g, '');
	return id;
};

// setup database if it doesn't exist
exports.setup = function () {
	db.query('CREATE TABLE IF NOT EXISTS articles (id VARCHAR PRIMARY KEY, title TEXT, content TEXT, created NUMERIC)');
};

// get article from database
exports.read = function (id, callback) {
	id = exports.id(id);

	db.query('SELECT * FROM articles WHERE id = ?', [ id ], {
		id: String,
		title: String,
		content: String,
		created: Date
	}, function (rows) {
		callback(rows[0]);
	});
};

// update or insert article to database
exports.store = function (article, callback) {
	var id = exports.id(article.title);

	if (article.id && article.id !== id)
		exports.remove(article.id);

	db.query('INSERT OR REPLACE INTO articles (id, title, content, created) VALUES (?, ?, ?, strftime("%s", "now"))', [ id, article.title, article.content ]);
	callback(id);
};

// remove article from database
exports.remove = function (id) {
	id = exports.id(id);

	db.query('DELETE FROM articles where id = ?', [ id ]);
};

exports.setup();

module.exports = exports;

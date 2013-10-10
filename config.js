var path = require('path');

// app-specific configuration
exports.app = {
    port: 8080,
    host: '0.0.0.0',
    secret: 'keyboard cat'
};

// database-specific configuration
exports.db = {
	sqlite: '/usr/bin/sqlite3',
	file: path.join(__dirname, 'wiki.sqlite')
};

// wiki-specific configuration
exports.wiki = {
	theme: 'default',
	startpage: 'home'
};

module.exports = exports;

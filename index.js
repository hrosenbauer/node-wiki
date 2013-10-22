var path = require('path'),
    config = require(path.join(__dirname, 'config')),
    ejs = require('ejs-locals'),
    express = require('express'),
    app = express();

app.configure(function () {
    // logging
    app.use(express.logger('dev'));

    // errorhandling with development info
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    // add gzip compression
    app.use(express.compress());

    // allow _PUT, _DELETE, parse form parameters
    app.use(express.methodOverride());
    app.use(express.bodyParser());

    // initialize secret sessions
    app.use(express.cookieParser(config.app.secret));
    app.use(express.session({
        secret: config.app.secret
    }));

    // use csrf tokens
    app.use(express.csrf());
    app.use(function (req, res, next) {
        res.locals.csrf = req.session._csrf;
        next();
    });

    // set view engine
    app.engine('ejs', ejs);
    app.set('views', path.join(__dirname, 'themes', config.wiki.theme, 'views'));
    app.set('view engine', 'ejs');

    // set specific routing
    app.use(express.favicon());
    app.use(express.static(path.join(__dirname, 'themes', config.wiki.theme, 'public')));
    app.use(app.router);
});

// page routes
var routes = require(path.join(__dirname, 'routes', 'articles'));
app.get('/', routes.index);
app.get('/:id', routes.id, routes.view);
app.post('/:id/edit', routes.id, routes.update);
app.post('/:id/delete', routes.id, routes.remove);

// bind app to specific address and port
app.listen(config.app.port, config.app.host, function () {
    console.log('listening at http://%s:%s', config.app.host, config.app.port);
});

require('babel-register');
const appConfig = require('./config.js');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const User = require('./models/user');

// Route Files
const index = require('./routes/index');
const api = require('./routes/api/index');
const authentication = require('./routes/api/authentication');
const users = require('./routes/api/users');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/draftapp3');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Favicon
app.use(favicon(path.join(__dirname, 'public/images/favicons', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// app.use(require('express-session')({
//     secret: 'any random string can go here',
//     resave: false,
//     saveUninitialized: false,
// }));

// Express Session
const sessionValues = {
    cookie: {},
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    secret: appConfig.expressSession.secret,
};
if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionValues.cookie.secure = true;
}
app.use(expressSession(sessionValues));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Webpack Server
if (process.env.NODE_ENV !== 'production') {
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: true,
            'errors-only': true,
        },
    }));
    app.use(webpackHotMiddleware(webpackCompiler, {
        log: console.log,
    }));
}

// Configure Rate Limiter
const apiLimiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50, // requests allowed
    delayMs: 0, // disabled
});
app.use('/api', apiLimiter);

app.use('/api', api);
app.use('/api/authentication', authentication);
app.use('/api/users', users);
app.use('/*', index);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // Ret locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

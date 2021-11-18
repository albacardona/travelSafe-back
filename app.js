require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const path          = require('path');
const passport      = require('passport');

const cors = require('./configs/cors.config');
const session = require('./configs/session.config');

require('./configs/db.config');
require('./configs/passport.config');


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors);

// Express View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Enable authentication using session + passport
app.use(session)
app.use(passport.initialize());
app.use(passport.session());

//LOCAL TITLE
app.locals.title = 'TRAVELsafe new backend';

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

module.exports = app;

require('dotenv').config();

const cookieParser  = require('cookie-parser');
const express       = require('express');
const logger        = require('morgan');
const path          = require('path');
const passport      = require('passport');

const cors          = require('./configs/cors.config');
const session       = require('./configs/session.config');

require('./configs/db.config');
require('./configs/passport.config');

const app_name = require('./package.json').name;
// const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors);

// app.use(cors({
//   credentials: true,
//   origin: ["http://localhost:3001"]
// }));

// Enable authentication using session + passport
app.use(session)
app.use(passport.initialize());
app.use(passport.session());

//LOCAL TITLE
app.locals.title = 'TRAVELsafe new backend';

const index = require('./routes/index');
app.use('/', index);

module.exports = app;

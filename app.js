require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const session       = require('express-session')
const bcrypt        = require('bcryptjs')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/User')

// CONNECTING DB
mongoose
  .connect(`mongodb://localhost/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.use(session({ 
  secret: 'password', 
  resave: true, 
  saveUninitialized: true
}));

//USER PASSPORT MIDDLEWARES
passport.serializeUser((user, callback) => {
	callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
	User.findById(id).then((user) => callback(null, user)).catch((err) => callback(err));
});


//LOCALSTRATEGY MIDDLEWARE
passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return next(null, false, { message: 'Wrong username'})
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Wrong password' })
      }
      return next(null, user)
    })
    .catch(err => next(err))
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());


//LOCAL TITLE
app.locals.title = 'TRAVELsafe new backend';


const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);


module.exports = app;

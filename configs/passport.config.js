const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

//USER PASSPORT MIDDLEWARES
passport.serializeUser((user, callback) => {
	callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
	User.findById(id).then((user) => callback(null, user)).catch((err) => callback(err));
});

//LOCALSTRATEGY MIDDLEWARE
passport.use(
  new LocalStrategy({ 
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (req, email, password, next) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return next(null, false, { message: 'Wrong email'})
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return next(null, false, { message: 'Wrong password' })
        }
        return next(null, user)
      })
      .catch(err => next(err))
  }
))
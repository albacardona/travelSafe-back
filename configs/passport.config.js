// const session       = require('express-session')
// const bcrypt        = require('bcryptjs')
// const passport      = require('passport')
// const LocalStrategy = require('passport-local').Strategy

// const User = require('../models/User')

// module.exports = app => {
  
//   //SESSION MIDDLEWARE
//   app.use(session({
//     secret: 'your-secret',
//     resave: true,
//     saveUninitialized: true
//   }))

//   //USER PASSPORT MIDDLEWARES
//   passport.serializeUser((user, callback) => {
//     callback(null, user._id);
//   });

//   passport.deserializeUser((id, callback) => {
//     User.findById(id).then((user) => callback(null, user)).catch((err) => callback(err));
//   });


//   //LOCALSTRATEGY MIDDLEWARE
//   passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
//     User.findOne({ username })
//       .then(user => {
//         if (!user) {
//           return next(null, false, { message: 'Wrong username'})
//         }
//         if (!bcrypt.compareSync(password, user.password)) {
//           return next(null, false, { message: 'Wrong password' })
//         }
//         return next(null, user)
//       })
//       .catch(err => next(err))
//   }))


//   //PASSPORT MIDDLEWARE
//   app.use(passport.initialize())
//   app.use(passport.session)
// }
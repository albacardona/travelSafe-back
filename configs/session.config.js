const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');


module.exports = session({
  secret: 'TRAVELsafe',
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
    * 1000
  },
  store: MongoStore.create({
    mongoUrl: process.env.DBURL,
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7
  })
});
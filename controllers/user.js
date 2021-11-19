const passport   = require('passport')
const bcrypt     = require('bcryptjs')

const User = require('../models/User')

exports.signup = (req, res, next) => {
  const {
    name,
    lastName,
    password,
    email,
    city
  } = req.body;

  if (!name || !lastName || !password || !email || !city) {
    res.json({ message: 'Please, fill all the fields.' }).status(400);
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Weak password.'})
  }

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: 'Username check error.'});
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Sorry, this username is already taken.'})
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      name,
      lastName,
      email,
      password: hashPass,
      city,
      alreadyVisited: [city]
    });

    aNewUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Oops! Something went wrong. Please, try again.'});
        return;
      }

      req.login(aNewUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Login error.' });
          return;
        }

        res.status(200).json(aNewUser);
      });
    });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Error authenticationg user.'})
      return;
    }

    if (!theUser) {
      res.json(failureDetails).status(401);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session error.' })
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();

  res.status(200).json({ message: 'Log out success!' })
};

exports.loggedin = (req, res) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.json({ });
};
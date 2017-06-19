const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/Dataschemas').User;
// auth.js
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const validate = require('../shared/validation');
const isEmpty = require('lodash/isEmpty');
const icons = require('../assignIcon').icons;



const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const logout = config.url.logout || '/logout';
const login = config.url.login || '/login';
const signup = config.url.signup || '/signup';
const exists = config.url.exists || '/exists'
const success = config.url.success || '/';
const failure = config.url.failure || '/';


const auth = function(req, res, next) {
  return passport.authenticate('jwt', {
    session: false
  });
}

const fail = function(err, req, res, next) {
  res.redirect(failure);
}


const init = function(app) {

  var strategy = new JwtStrategy(params, function(payload, done) {
    db.findUser(payload.username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user || (payload.id !== user._id)) {
        return done(null, false);
      }
      return done(null, {
        id: user.id,
        username: user.username,
		image: user.image
      });
    });
  });

  passport.use(strategy);
  app.use(passport.initialize());

  /*
  app.get(logout, (req, res) => {
  	req.logout();
  	req.session.destroy();
  	res.redirect(failure);
  });
  */

  // check if exits
  app.get(exists + '/:identifier', (req, res) => {
    User.find({
      'username': req.params.identifier
    }, (err, user) => {
      res.json({
        user
      });
    });
  });

  // login
  app.post(login, (req, res) => {
    // get username an password from request
    const {
      username,
      password
    } = req.body;
    // check users in database
    User.find({
      'username': username
    }, (err, user) => {
      // if one user exists check if the password is correct
      if (user.length == 1) {
        if (bcrypt.compareSync(password, user[0].get('password'))) {
          // create token with data
          const token = jwt.sign({
            id: user[0]._id,
            username: user[0].username,
            image: user[0].image
          }, config.jwtSecret);
          res.json({
            token
          });
        } else {
          // wrong password
          res.status(401).json({
            errors: {
              form: 'Invalid Credentials'
            }
          });
        }
      } else {
        // more than one user or no user exist
        res.status(401).json({
          errors: {
            form: 'Invalid Credentials'
          }
        });
      }
    });
  });

  // sign up
  app.post(signup, (req, res) => {
    let {
      errors
    } = validate.val(req.body);
    User.find({
      'username': req.body.username
    }, (err, user) => {

      if (user.length) {
        errors.username = 'username already taken';
      }

      if (isEmpty(errors)) {
        const user = new User(req.body);
		console.log((Math.random() * icons.length) + 1);
		user.image = config.url.avatarUrl + icons[Math.floor((Math.random() * icons.length) + 1)];
        // crypt pwd
        user.password = user.decode(user.password);
        // save user
        user.save((err, object) => {
          // send error or sucess
          if (err) {
            res.status(500).json({
              error: errors
            });
          } else {
            res.json({
              success: true
            });
          }
        });
      }
    });
  });
}

module.exports = {
  init: init,
  fail: fail,
  auth: auth
};

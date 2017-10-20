'use strict';

module.exports = exports = function(passport) {
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    function(email, password, done) {

      async.waterfall([
        // find user
        function (cb) {
          Framework.models.User.findOne({
            email: email
          }, function(err, user) {
            if (err || !user){
              return cb(null, false);
            }
            Framework.models.User.validatePassword(password, user.password, function(err, isValid) {
              if (err) {
                console.log(err);
                return cb('Failed to validate password!');
              }
              if (!isValid) {
                return cb('Invalid password');
              }
              return cb(null, user);
            });
          });
        },

      ], function (err, user) {
        if (err) {
          return done(null, false, { message: err });
        }

        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Framework.models.User.findOne({ _id: id }, '-password -__v')
    .lean()
    .exec(function(err, user) {
      done(err, user);
    });
  });

  if (!Framework.config.oauth){
    return;
  }
  if (_.isPlainObject(Framework.config.oauth.twitter) ) {
    var TwitterStrategy = require('passport-twitter').Strategy;

    passport.use(new TwitterStrategy({
      consumerKey: Framework.config.oauth.twitter.key,
      consumerSecret: Framework.config.oauth.twitter.secret,
      // userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      includeEmail: true
      // callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
      done(null, false, {
        token: token,
        tokenSecret: tokenSecret,
        profile: profile
      });
    }
  ));
}

if (_.isPlainObject(Framework.config.oauth.github) ) {
  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(new GitHubStrategy({
    clientID: Framework.config.oauth.github.key,
    clientSecret: Framework.config.oauth.github.secret,
    customHeaders: { "User-Agent": Framework.config.projectName }
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, false, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile
    });
  }
));
}

if (_.isPlainObject(Framework.config.oauth.facebook) ) {
  var FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy({
    clientID: Framework.config.oauth.facebook.key,
    clientSecret: Framework.config.oauth.facebook.secret,
    enableProof: true,
    profileFields: ['id', 'displayName', 'email', 'name', 'gender', 'profileUrl', 'picture']
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    // console.log(accessToken);
    // console.log(refreshToken);
    done(null, false, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile
    });
  }
));
}

if (_.isPlainObject(Framework.config.oauth.google) ) {
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  passport.use(new GoogleStrategy({
    clientID: Framework.config.oauth.google.key,
    clientSecret: Framework.config.oauth.google.secret
    // callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, false, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profile: profile
    });
  }
));
}

if (_.isPlainObject(Framework.config.oauth.tumblr) ) {
  var TumblrStrategy = require('passport-tumblr').Strategy;
  passport.use(new TumblrStrategy({
    consumerKey: Framework.config.oauth.tumblr.key,
    consumerSecret: Framework.config.oauth.tumblr.secret
  },
  function(token, tokenSecret, profile, done) {
    done(null, false, {
      token: token,
      tokenSecret: tokenSecret,
      profile: profile
    });
  }
));
}
};

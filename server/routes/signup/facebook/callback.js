module.exports = {
  get: function (req, res, next) {

    async.waterfall([
      // authenticate with facebook
      function (cb) {
        req._passport.instance.authenticate('facebook', {
          callbackURL: '/signup/facebook/callback/'
        }, function(err, user, info) {
          if (err){
            console.log(err);
          }
          if (!info || !info.profile) {
            return cb('Empty response from facebook, please try again.');
          }

          if (!info.profile.emails || info.profile.emails.length === 0){
            return cb('No email available, please allow facebook permission to access email.');
          }
          return cb(null, info);
        })(req, res, next);
      },

      // check user
      function (info, cb) {
        Framework.models.User.findOne({
          'facebook.id': info.profile._json.id
        }, function(err, user) {
          if (err){
            return cb(err.message);
          }
          if (user){
            return cb("Existing user found with this facebook id. Please login with facebook to view your profile.");
          }
          return cb(null, info);
        });
      },

      // create user
      function (info, cb) {

        var fieldsToSet = {
          email: info.profile.email,
          name: info.profile._json.name,
          gender: info.profile._json.gender,
          facebook: info.profile._json,
        }

        Framework.models.User.findOne({
          email: fieldsToSet.email,
        }, function(err, user) {
          if (user) {
            return cb('There is already an account with same email, login with email to add facebook to your profile.');
          }
          Framework.models.User.create(fieldsToSet, function(err, user) {
            if (err){
              console.log(err);
              return cb(err.message);
            }
            return cb(null, user);
          });

        });


      },

      function (user, cb) {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            return cb(err.message);
          }
          return cb();
        });
      },
    ], function (err) {
      if (err){

        req.flash('error', err);
        return res.redirect('/signup');
      }

      res.redirect('/user/profile');

    });
  }
};

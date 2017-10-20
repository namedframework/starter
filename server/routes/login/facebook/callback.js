module.exports = {
  get: function (req, res, next) {

    async.waterfall([
      // authenticate with facebook
      function (cb) {
        req._passport.instance.authenticate('facebook', {
          callbackURL: '/login/facebook/callback/'
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
            return cb(err);
          }
          if (!user){
            return cb('No user found with this facebook id, Please register or add facebook to your profile.');
          }
          return cb(null, user);
        });
      },
      function (user, cb) {
        req.login(user, function(err) {
          if (err) {
            return cb(err);
          }
          return cb();
        });
      },
    ], function (err) {
      if (err){

        req.flash('error', err);
        return res.redirect('/login');
      }

      res.redirect('/user/profile');

    });
  }
};

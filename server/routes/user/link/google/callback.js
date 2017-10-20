module.exports = {
  get: function (req, res, next) {
    var googleInfo;

    async.waterfall([
      // authenticate with google
      function (cb) {
        req._passport.instance.authenticate('google', {
          callbackURL: '/user/link/google/callback/',
          failureRedirect: '/user/profile'
        }, function(err, user, info) {
          if (err){
            console.log(err);
          }
          if (!info || !info.profile) {
            return cb('Empty response from google, please try again.');
          }

          if (!info.profile.emails || info.profile.emails.length === 0){
            return cb('No email available, please allow google permission to access email.');
          }
          googleInfo = info;
          return cb(null, info);
        })(req, res, next);
      },

      // check user
      function (info, cb) {
        Framework.models.User.findOne({
          'google.id': info.profile._json.id
        }, function(err, user) {
          if (err){
            return cb(err);
          }
          return cb(null, info);
        });
      },
      function (info, cb) {
        Framework.models.User.findByIdAndUpdate(req.user._id, {
          'google': info.profile._json
        }, cb);
      },
    ], function (err) {
      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'Google added to your profile.')
      }

      res.redirect('/user/profile');

    });
  }
};

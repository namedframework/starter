module.exports = {
  get: function (req, res, next) {

    async.waterfall([
      // authenticate with google
      function (cb) {
        req._passport.instance.authenticate('google', {
          callbackURL: '/user/unlink/google/callback/',
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

          if (req.user.google && req.user.google.id !== info.profile._json.id){
            return cb('This is not the saved google account.')
          }
          return cb(null, info);
        })(req, res, next);
      },

      function (info, cb) {
        Framework.models.User.findByIdAndUpdate(req.user._id, {
          'google': null
        }, cb);
      },
    ], function (err) {
      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'Google removed from your profile.')
      }

      res.redirect('/user/profile');

    });
  }
};

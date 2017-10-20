module.exports = {
  get: function (req, res, next) {

    async.waterfall([
      // authenticate with facebook
      function (cb) {
        req._passport.instance.authenticate('facebook', {
          callbackURL: '/user/unlink/facebook/callback/'
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
          if (req.user.facebook && req.user.facebook.id !== info.profile._json.id){
            return cb('This is not the saved facebook account.')
          }
          return cb(null, info);
        })(req, res, next);
      },

      function (info, cb) {
        Framework.models.User.findByIdAndUpdate(req.user._id, {
          'facebook': null
        }, cb);
      },
    ], function (err) {
      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'Facebook removed from your profile.')
      }

      res.redirect('/user/profile');

    });
  }
};

module.exports = {

  post: function (req, res) {
    async.series([
      function (cb) {
        if (!req.body.password || !req.body.confirmPassword){
          return cb('Password and Confirm Password required.')
        }
        if (req.body.password !== req.body.confirmPassword){
          return cb('Password and Confirm Password does not match.')
        }
        Framework.models.User.encryptPassword(req.body.password, function (err, hash) {
          if(err) return cb(err);
          req.body.password = hash;
          return cb();
        });
      },
      function (cb) {
        Framework.models.User.findByIdAndUpdate(req.user._id, {
          password: req.body.password,
        }, cb);
      }
    ], function (err) {

      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'Password changed.');
      }
      return res.redirect('/user/profile');
    });
  }
};

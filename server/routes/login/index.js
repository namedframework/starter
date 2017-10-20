module.exports = {
  get: function (req, res, next) {
    if (req.isAuthenticated()){
      return res.redirect('/user/profile');
    }
    res.render('pages/login');
  },
  post: function (req, res, next) {
    var email = req.body.username = req.body.email;
    var password = req.body.password;

    async.series([
      // check
      function (cb) {
        if(Framework.utils.isEmpty(email, password)){
          return cb("Username and password can not be empty");
        }
        return cb();
      },
      // find user
      function (cb) {
        req._passport.instance.authenticate('local', function(err, user, info) {
          if (err) return cb(err);
          if (!user) return cb('Invalid email / password.');

          req.login(user, function(err) {
            if (err) return cb(err);
            return cb();
          });
        })(req, res);
      }
    ], function (err) {
      if (err){
        req.flash('error', err);
        return res.redirect('/login');
      }
      return res.redirect('/user/profile');
    });
  },
};

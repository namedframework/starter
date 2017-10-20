module.exports = {
  get: function (req, res, next) {
    if (req.isAuthenticated()){
      return res.redirect('/user/profile');
    }
    res.render('pages/signup');
  },
  post: function (req, res, next) {
    var email = req.body.username = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    async.series([
      // check
      function (cb) {
        if(Framework.utils.isEmpty(email, password, confirmPassword)){
          return cb("Username and password can not be empty");
        }
        if (password !== confirmPassword){
          return cb("Password and Confirm Password does not match.");
        }
        return cb();
      },
      function (cb) {
        Framework.models.User.encryptPassword(req.body.password, function (err, hash) {
          if(err) return cb(err);
          req.body.password = hash;
          return cb();
        });
      },
      // find user
      function (cb) {
        Framework.models.User.create(req.body, function (err, user) {
          return cb(err);
        })
      }
    ], function (err) {
      if (err){
        req.flash('error', err);
        return res.redirect('/signup');
      }
      req.flash('success', 'Signup Successfull, login with new details.');
      res.redirect("/login");
    });
  },
};

module.exports = {
  get: function (req, res, next) {
    res.render('admin/login');
  },
  post: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async.series([
      // check
      function (cb) {
        if(Framework.utils.isEmpty(username, password)){
          return cb("Username and password can not be empty");
        }
        return cb();
      },
      // find user
      function (cb) {
        Framework.models.Admin.findOne({username: username.toLowerCase()}, '_id name password')
        .lean()
        .exec(function (err, user) {
          if (err || Framework.utils.isEmpty(user)) return cb("Username and Password does not match!!");
          res.locals.user = user;
          cb();
        });
      },
      function (cb) {
        // check password
        require('bcrypt-nodejs').compare(password, res.locals.user.password, function (err, result) {
          if (err || Framework.utils.isEmpty(result) || !result)  return cb("Username and Password does not match!!!");
          return cb();
        });
      },
      function (cb) {
        let adminData = {
          id: res.locals.user._id,
          name: res.locals.user.name,
          securityHash: Date.now().toString() + (Math.random() + 1).toString().replace('.',''),
          useragent: req.headers['user-agent'],
        }

        Framework.models.Admin.findByIdAndUpdate(res.locals.user._id, {
          securityHash: adminData.securityHash
        }, function (err, result) {
          console.log(err);
          if(err) return cb('Security Check Failed! Try Again!!');
          // set the user agent (browser) to session
          req.session.admin = adminData;
          cb();
        });
      }
    ], function (err) {
      if (err){
        req.flash('error', err);
        return res.redirect('/login/admin');
      }
      let url = '/admin';
      if (req.session.redirectUrl) {
        url = req.session.redirectUrl;
        delete req.session.redirectUrl;
      }
      res.redirect(url);
    });
  },
};

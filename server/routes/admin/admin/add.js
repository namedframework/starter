module.exports = {

  post: function (req, res) {

    async.series([
      function (cb) {
        if (Framework.utils.isEmpty(req.body.username, req.body.confirmPassword, req.body.password)){
          return cb('All fields are required.');
        }
        if (req.body.password !== req.body.confirmPassword){
          return cb('Password and confirm password does not match!');
        }

        req.body.username = req.body.username.toLowerCase();

        Framework.models.Admin.count({
          username: req.body.username,
        })
        .exec(function (err, total) {
          if (total > 0 ) return cb(`Username (${req.body.username}) is already registered as admin.`);
          cb();
        });
      },
      function (cb) {
        Framework.models.User.encryptPassword(req.body.password, function (err, hash) {
          if (err) return cb(err);
          req.body.password = hash;

          Framework.models.Admin.create(req.body, cb);
        });
      },
    ], function (err) {

      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'New admin added.');
      }

      res.redirect('/admin/admin/list');
    });
  },
};

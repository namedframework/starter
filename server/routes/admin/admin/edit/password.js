module.exports = {
  _config: {
    params: 'id',
  },

  post: function (req, res, next) {

    async.series([
      function (cb) {
        Framework.models.Admin.findOne({
          _id: req.params.id,
        }, function (err, admin) {
          if (err || !admin){
            return cb(err || "Admin not found!");
          }
          if (admin.isSuperAdmin){
            return cb("You can not edit main admin.");
          }
          return cb();
        });
      },
      function (cb) {
        if (Framework.utils.isEmpty( req.body.confirmPassword, req.body.password)){
          return cb('All fields are required.');
        }
        if (req.body.password !== req.body.confirmPassword){
          return cb('Password and confirm password does not match!');
        }

        Framework.models.User.encryptPassword(req.body.password, function (err, hash) {
          if (err) return cb(err);
          req.body.password = hash;
          return cb();
        });
      },
      function (cb) {

        Framework.models.Admin.findOneAndUpdate({
          _id: req.params.id,
        }, {
          password: req.body.password,
        }, function (err, result) {
          return cb();
        });
      },
    ], function (err) {

      if (err){
        req.flash('error', err );
      }else {
        req.flash('success', 'Admin password updated.');
      }
      return res.redirect('/admin/admin/list');

    });
  },
};

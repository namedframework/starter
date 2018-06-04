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
            return cb("You can not remove super admin.");
          }
          return cb();
        });
      },
      function (cb) {
        Framework.models.Admin.remove({
          _id: req.params.id,
        }, cb);
      },
    ], function (err) {

      if (err){
        req.flash('error', err );
      }else {
        req.flash('success', 'Admin removed.');
      }

      return res.redirect('/admin/admin/list');

    });
  },
};

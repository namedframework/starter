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
          if (Framework.utils.isEmpty( req.body.name, req.body.contact)){
            return cb('All fields are required.');
          }
          return cb();
        });
      },
      function (cb) {
        Framework.models.Admin.findOneAndUpdate({
          _id: req.params.id,
        }, {
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
          remarks: req.body.remarks,
        }, cb);
      },
    ], function (err) {

      if (err){
        req.flash('error', err );
      }else {
        req.flash('success', 'Admin updated.');
      }

      return res.redirect('/admin/admin/list');

    });
  },
};

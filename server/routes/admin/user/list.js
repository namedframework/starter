module.exports = {

  get: function (req, res, next) {
    async.series([
      function (cb) {
        Framework.models.User.find({})
        .populate('group', 'name')
        .exec(function (err, users) {
          res.locals.users = users || [];
          cb();
        });
      },
    ], function () {
      res.render('admin/pages/user/list');
    })
  }
};

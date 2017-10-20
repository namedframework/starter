module.exports = {
  get: function (req, res, next) {
    if (req.session && req.session.admin){
      Framework.models.Admin.findByIdAndUpdate(req.session.admin.id,{
        securityHash: null
      }, function (err, result) {
        delete req.session.admin;
        req.session.save();
        res.redirect('/login/admin');
      });
    }else {
      delete req.session.admin;
      req.session.save();
      res.redirect('/login/admin');
    }

  },
};

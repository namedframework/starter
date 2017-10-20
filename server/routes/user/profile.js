module.exports = {

  get: function (req, res, next) {
    res.render('user/profile');
  },
  post: function (req, res) {
    delete req.body.email;
    Framework.models.User.findByIdAndUpdate(req.user._id, req.body, function (err) {
      if (err){
        req.flash('error', err);
      }else {
        req.flash('success', 'Profile updated.');
      }
      return res.redirect('/user/profile');
    });
  }
};

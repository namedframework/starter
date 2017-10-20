module.exports = {

  post: function (req, res) {

    Framework.models.User.findByIdAndRemove(req.user._id, function (err) {
      if (err){
        req.flash('error', err);
      }else {
        req.flash('info', 'Profile removed.');
      }
      return res.redirect('/');
    });
  }
};

const express = require('express');
const path = require('path');

module.exports = function (app) {

  // 404 error
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // default
  app.use(function(err, req, res, next) {
    var status = res.locals.status = err.status || 500;

    if (app.get('env') === 'development'){
      res.locals.error = err;
    }
    res.status(status).render('error');
  });

};

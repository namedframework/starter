const request = require('request');

module.exports.recaptcha = {
  verify: function (response, callback) {

    request.post({
      url:'https://www.google.com/recaptcha/api/siteverify',
      form: {
        secret: Framework.config.recaptcha.secret,
        response,
      }
    }, function(err,httpResponse,body){
      if (err || !body){
        return callback("Failed to check captcha, please try again.");
      }
      const json = JSON.parse(body);
      const msg = json.success ? null : "Verify that you are not a robot."
      return callback(msg);
    })

  }
};

const tokens = {
  sendAuthToken(req, res, next) {
    console.log(req.user);
    return res.redirect('/');
  },
};

module.exports = tokens;
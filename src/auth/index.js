const config = require('config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const appUrl = config.get('appUrl');

const auth = {
  init() {
    const successHandler = (accessToken, refeshToken, profile, done) => {
      done(null, profile);
    };

    const googleConfig = {
      clientID: config.get('google.clientId'),
      clientSecret: config.get('google.clientSecret'),
      callbackURL: `${appUrl}/auth/google/callback`,
    };

    passport.use(new GoogleStrategy(googleConfig, successHandler));
  },
};

module.exports = auth;

const passport = require('passport');
const router = require('express').Router();
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../db/models');
module.exports = router;

if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
  console.log(
    'Facebook client ID / secret not found. Skipping Facebook OAuth.'
  );
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  };

  const strategy = new FacebookStrategy(
    facebookConfig,
    (token, refreshToken, profile, done) => {
      console.log(profile);
      const facebookId = profile.id;
      const firstName = profile.displayName.split(' ')[0];
      const lastName = profile.displayName.split(' ').pop();
      User.find({ where: { facebookId } })
        .then(foundUser => {
          return foundUser
            ? done(null, foundUser)
            : User.create({
                firstName,
                lastName,
                facebookId
              }).then(createdUser => done(null, createdUser));
        })
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('facebook', { scope: 'email' }));

  router.get(
    '/callback',
    passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );
}

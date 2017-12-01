const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');
const postToMercury = require('../api/utils')
module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  };

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const email = profile.emails[0].value;
      User.find({ where: { googleId } })
        .then(foundUser => {
          return foundUser
            ? done(null, foundUser)
            : User.create({
                firstName,
                lastName,
                email,
                googleId
              }).then(createdUser => {
                return postToMercury(createdUser.id, {body: {url: 'https://medium.com/@kend77/welcome-to-marca-6c5566065204'}})
                .then(_ => done(null, createdUser))
              });
        })
        .catch(done);
    }
  );

  passport.use(strategy);

  router.get('/', passport.authenticate('google', { scope: 'email' }));

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  );
}

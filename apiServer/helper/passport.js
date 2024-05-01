const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_SECRET_KEY,
                callbackURL: 'http://localhost:3000/api/users/facebook/callback',
                profileFields: ['id', 'email', 'name', 'picture.type(large)'],
            },
            async (token, profile, done) => {
                console.log(profile['_json'], 'token: ', token);
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

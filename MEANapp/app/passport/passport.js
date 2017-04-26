var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'check123';


module.exports = function(app,passport) {


    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    passport.serializeUser(function(user, done) {
        token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'});
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: '422080801499546',
            clientSecret: '34f91021248106dea49daa111bb7ff89',
            callbackURL: "http://localhost:8000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile._json.email);
            User.findOne({ email: profile._json.email }).select('username password email').exec(function(err, user){
                if(err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                   // done(err);
                }
            });
            //done(null, profile);
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req,res){
        res.redirect('/facebook/' + token);
    });

    app.get('/auth/facebook/', passport.authenticate('facebook', { scope: 'email' }));


    return passport;
}

// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
// // Use the GoogleStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and Google
// //   profile), and invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//         clientID: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://www.example.com/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));
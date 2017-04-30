var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'check123';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
                    done(err);
                }
            });
            //done(null, profile);
        }
    ));



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
            clientID: '655984940226-ob15jvq3hvqha4969tlb3oco9tun1i9t.apps.googleusercontent.com',
            clientSecret: 'v2AnVyHOrkftnGRFnpAXxB7-',
            callbackURL: "http://localhost:8000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile.emails[0].value);
            User.findOne({ email: profile.emails[0].value }).select('username password email').exec(function(err, user){
                if(err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });
        }
    ));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email' ] }));
    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calender' ] }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }),
        function(req, res) {
            res.redirect('/google/' + token);
        });

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req,res){
        res.redirect('/facebook/' + token);
    });

    app.get('/auth/facebook/', passport.authenticate('facebook', { scope: 'email' }));


    return passport;
};
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Passport Google Package
// var User = require('../models/user'); // Import User Model
// var session = require('express-session'); // Import Express Session Package
// var jwt = require('jsonwebtoken'); // Import JWT Package
// var secret = 'check123'; // Create custom secret to use with JWT
// var TwitterStrategy = require('passport-twitter').Strategy;
//
// module.exports = function(app, passport) {
//     // Start Passport Configuration Settings
//     app.use(passport.initialize());
//     app.use(passport.session());
//     app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false } }));
//     // End Passport Configuration Settings
//
//     // Serialize users once logged in
//     passport.serializeUser(function(user, done) {
//         // Check if the user has an active account
//         if (user.active) {
//             // Check if user's social media account has an error
//             if (user.error) {
//                 token = 'unconfirmed/error'; // Set url to different error page
//             } else {
//                 token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' }); // If account active, give user token
//             }
//         } else {
//             token = 'inactive/error'; // If account not active, provide invalid token for use in redirecting later
//         }
//         done(null, user.id); // Return user object
//     });
//
//     // Deserialize Users once logged out
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user); // Complete deserializeUser and return done
//         });
//     });
//
//
//     // Google Strategy
//     passport.use(new GoogleStrategy({
//             clientID: '655984940226-rl0bu8079orha233skvh83eip92qffn3.apps.googleusercontent.com', // Replace with your Google Developer App client ID
//             clientSecret: '34f91021248106dea49daa111bb7ff89', // Replace with your Google Developer App client ID
//             callbackURL: "http://localhost:8000/auth/google/callback" // Replace with your Google Developer App callback URL
//         },
//         function(accessToken, refreshToken, profile, done) {
//             User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
//                 if (err) done(err);
//
//                 if (user && user !== null) {
//                     done(null, user);
//                 } else {
//                     done(err);
//                 }
//             });
//         }
//     ))
//
//     passport.use(new TwitterStrategy({
//             consumerKey: 'nAsRdF40TX5fQ7QivmuJGWWSj', // Replace with your Twitter Developer App consumer key
//             consumerSecret: 'WH4MaKulaiPzrBttgS5KlQzanXmZIKZ4hmAlflfwX8jk3WNTwA', // Replace with your Twitter Developer App consumer secret
//             callbackURL: "http://www.herokutestapp3z24.com/auth/twitter/callback", // Replace with your Twitter Developer App callback URL
//             userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
//         },
//         function(token, tokenSecret, profile, done) {
//             if (profile.emails) {
//                 User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
//                     if (err) {
//                         done(err);
//                     } else {
//                         if (user && user !== null) {
//                             done(null, user);
//                         } else {
//                             done(err);
//                         }
//                     }
//                 });
//             } else {
//                 user = {}; // Since no user object exists, create a temporary one in order to return an error
//                 user.id = 'null'; // Temporary id
//                 user.active = true; // Temporary status
//                 user.error = true; // Ensure error is known to exist
//                 done(null, user); // Serialize and catch error
//             }
//         }
//     ));
//
//
//     // Google Routes
//     app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'] }));
//     app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
//         res.redirect('/google/' + token); // Redirect user with newly assigned token
//     });
//
//
//     return passport; // Return Passport Object
// };

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = 'check123';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var gcal = require('google-calendar');
var google = require('googleapis');


module.exports = function(app,passport, auth) {


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
            callbackURL: "https://frozen-woodland-75947.herokuapp.com/auth/google/callback",
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
            clientID: ' 655984940226-dqfpncns14b1uih73i7fpmot9hd16m2l.apps.googleusercontent.com ',
            clientSecret: ' 4etHKG0Hhj84bKCBPr2YmaC- ',
            callbackURL: "http://localhost:8000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            User.findOne({ email: profile.emails[0].value }).select('username password email').exec(function(err, user){
                if(err) done(err);

                if (user && user !== null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });

            var google_calendar = google.calendar('v3');
            console.log('im here');
            google_calendar.events.list({
                auth: auth,
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            }, function(err, calendarList){
                console.log(calendarList);
                if(err){
                    console.log('bad list: ' + err);
                    return;
                }
                var events = calendarList.items;
                if(events.length ==0){
                    console.log('No items found');
                } else {
                    console.log('Upcoming events:');
                    console.log('%s -%s', start, event.summary);
                }

            })


        }

        // function(auth) {
        //     console.log('hihihihihi');
        //     var calendar = google.calendar('v3');
        //     calendar.events.list({
        //         auth: auth,
        //         calendarId: 'primary',
        //         timeMin: (new Date()).toISOString(),
        //         maxResults: 10,
        //         singleEvents: true,
        //         orderBy: 'startTime'
        //     }, function(err, response) {
        //         if (err) {
        //             console.log('The API returned an error: ' + err);
        //             return;
        //         }
        //         var events = response.items;
        //         if (events.length == 0) {
        //             console.log('No upcoming events found.');
        //         } else {
        //             console.log('Upcoming 10 events:');
        //             for (var i = 0; i < events.length; i++) {
        //                 var event = events[i];
        //                 var start = event.start.dateTime || event.start.date;
        //                 console.log('%s - %s', start, event.summary);
        //             }
        //         }
        //     });
        // }




));

    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/calendar', 'profile', 'email' ] }));
    //app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/calender' ] }));

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

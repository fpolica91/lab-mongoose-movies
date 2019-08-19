const passport = require("passport");
const User = require('../models/User')
const SlackStrategy = require('passport-slack').Strategy
const GitHubStrategy = require('passport-github').Strategy;


passport.use(
    new SlackStrategy(
        {
            clientID: "2432150752.729768916112",
            clientSecret: "21774aa850fe6a78aa1eaf01b38b3a97",
            callbackURL: "/auth/slack/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            // to see the structure of the data in received response:
            console.log("Slack account details:", profile);

            User.findOne({ slackID: profile.id })
                .then(user => {
                    if (user) {
                        done(null, user);
                        return;
                    }

                    User.create({ slackID: profile.id })
                        .then(newUser => {
                            done(null, newUser);
                        })
                        .catch(err => done(err)); // closes User.create()
                })
                .catch(err => done(err)); // closes User.findOne()
        }
    )
);


passport.use(new GitHubStrategy({
    clientID: "764d616dc4bdee2647f9",
    clientSecret: "557c56a67951c3c01b16294bb896e8f7f62264c1",
    callbackURL: "/auth/github/callback"
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ githubID: profile.id })
            .then(newUser => {
                done(null, newUser)
            })
            .catch(err => next(err))

        User.create({ githubID: profile.id })
            .then(newUser => {
                done(null, newUser)
            })
            .catch(err => next(err))

    }


))
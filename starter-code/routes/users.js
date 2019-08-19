const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const passport = require('passport')
const flash = require('connect-flash')


router.get("/signup", (req, res, next) => {
    res.render("users/signup")
})

router.post('/signup', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        req.flash("error", "enter a valid username and password")
        res.redirect('/signup')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashpass = bcrypt.hashSync(password, salt)

    User.create({
        username: req.body.username,
        password: hashpass
    })
        .then(() => res.redirect('/login'))
        .catch(err => {
            res.redirect('/singup', res.flash("error", "error creating account"))
            next(err)
        })
})


//------- HERE WE FIRST GET THE ROUTE AND THEN USE PASSPORT METHOD TO AUTH//

router.get('/login', (req, res, next) => {
    res.render('users/login')
})



router.post('/login', passport.authenticate("local", {
    successRedirect: "/celebs",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));


// AUTHENTICATION USING SLACK
router.get("/auth/slack", passport.authenticate('slack'));

router.get("/auth/slack/callback",
    passport.authenticate("slack", {
        successRedirect: "/main",
        failureRedirect: "/"
    })
)


// AUTHENTICATION WITH GITHUB
router.get("/auth/github", passport.authenticate('github'))

router.get("/auth/github/callback",
    passport.authenticate('github', {
        successRedirect: "/main",
        failureRedirect: "/"
    })
)




router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/login")
    })
})

module.exports = router;
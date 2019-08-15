const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

router.get("/signup", (req, res, next) => {
    res.render("users/signup")
})

router.post('/signup', (req, res, next) => {
    let pword = req.body.password
    let salt = bcrypt.genSaltSync(10)
    const hashpass = bcrypt.hashSync(pword, salt)
    User.create({
        username: req.body.username,
        password: hashpass
    })
        .then(() => res.redirect('/movies'))
        .catch(err => next(err))
})


router.get('/login', (req, res, next) => {
    res.render('users/login')
})

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
        res.render("users/signup")
    }
    User.findOne({ "username": username })
        .then(user => {
            if (!user) {
                res.render("users/login", {
                    error: "User not found"
                })
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect("/celebs")
            } else {
                res.render("users/login", {
                    error: " Incorrect Passoword"
                })
            }

        })
})


module.exports = router;
const express = require('express')
const router = express.Router()


router.get("/", (req, res, next) => {
    res.render("/")
})

router.use((req, res, next) => {
    if (!req.user) {
        res.redirect("/login")
    }
    next()
})

router.get("/main", (req, res, next) => {
    res.render("authorized/main", { user: req.user })
})

router.get("/featured", (req, res, next) => {
    res.render("authorized/featured")
})




module.exports = router;
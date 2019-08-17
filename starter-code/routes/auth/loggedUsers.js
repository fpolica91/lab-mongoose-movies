const express = require('express')
const router = express.Router()


router.get("/", (req, res, next) => {
    res.render("/")
})

router.use((req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect("/login")
    }
})

router.get("/main", (req, res, next) => {
    res.render("authorized/main", { user: req.user })
})



module.exports = router;
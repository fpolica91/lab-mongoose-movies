const express = require('express')
const router = express.Router()
const Celebrity = require('../models/Celebrity')



// GET ALL CELEBRITIES//
router.get('/celebs', (req, res, next) => {
    if (!req.user) {
        req.flash('error', "please login to view profiles")
        res.redirect('/login')
    }


    Celebrity.find()
        .then(result => {
            let filteredCelebrities = result.map(celeb => {
                if (celeb.creator.equals(req.user._id)) {
                    celeb.owned = true
                    return celeb;
                } else {
                    return celeb
                }
            })
            res.render('celebrities/index', { celebrity: filteredCelebrities })
        })
        .catch(err => next(err))
})

// GET CELEBRITY DETAIL PAGE!


// CREATE A NEW CELEBRITY..

router.get('/celebs/new', (req, res, next) => {
    res.render("celebrities/new")
})

router.post("/celebs/create", (req, res, next) => {

    const { firstName, lastName, occupation, catchPhrase } = req.body

    Celebrity.create({
        firstName,
        lastName,
        occupation,
        catchPhrase,
        creator: req.user._id
    })
        .then(celeb => {
            req.flash("success", "Celebrity Succesfully created")
            res.redirect("/celebs")
        })
        .catch(err => console.log(err))
})


// DELETE A CELEBRITY//
router.post('/celebs/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(celeb => res.redirect('/celebs'))
})

// EDITING CELEBRITIES -> using post

router.get('/celebs/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celeb => res.render("celebrities/edit", { celeb }))
})

router.post('/celebs/:id/edited', (req, res, next) => {
    // req.param.id refers to the id of the celebrity, and req.body are the new values
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
        .then(celeb => res.redirect('/celebs'))
        .catch(err => console.log(err))
})




router.get('/celebs/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(actor => res.render('celebrities/show', { actor }))
        .catch(err => {
            next(err);
            console.log(err)
        })
})




module.exports = router
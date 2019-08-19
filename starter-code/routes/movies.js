const express = require('express');
const router = express.Router()
const Movies = require('../models/Movies');
const Celebrity = require("../models/Celebrity")


router.use((req, res, next) => {
    if (!req.user) {
        req.flash('error', "sign in or sign up to see movies")
        res.redirect("/login")
    }
    next()
})

router.get('/movies', (req, res, next) => {
    Movies.find()
        .then(mov => {
            res.render('movies/show', { mov })
        })
        .catch(err => {
            next(err)
            console.log(err)
        })

})


//CREATE NEW MOVIE

router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
        .then(result => {
            res.render("movies/new", { celeb: result })
        })
        .catch(err => next(err))
})

router.post("/movies/create", (req, res, next) => {
    Movies.create(req.body)
        .then(mov => {
            res.redirect('/movies')
        })
        .catch(err => {
            next(err)
            console.log(err)
        })
})

// END OF CREATE NEW MOVIE



// DELETE

router.post("/movies/:id/delete", (req, res, next) => {
    Movies.findByIdAndDelete(req.params.id)
        .then(mov => res.redirect('/movies'))
        .catch(err => {
            next(err)
            console.log(err)
        })
})

// UPDATE

router.get("/movies/:id/edit", (req, res, next) => {
    Movies.findById(req.params.id)
        .then(movie => {
            Celebrity.find()
                .then(celebs => {
                    celebs.forEach(celeb => {
                        movie.cast.forEach(celebID => {
                            if (celebID.equals(celeb._id)) {
                                celeb.included = true
                            }
                        })
                    })
                    res.render("movies/edit", { movie, cast: celebs })
                })

        })
})


router.post("/movies/:id/edited", (req, res, next) => {
    Movies.findByIdAndUpdate(req.params.id, req.body)
        .then(res.redirect('/movies'))
        .catch(err => {
            next(err)
            console.log(errs)
        })
})





// DISPLAY MOVIE DETAILS PAGE
router.get('/movies/:id', (req, res, next) => {
    Movies.findById(req.params.id).populate('cast')
        .then(mov => res.render('movies/details', { mov }))
        .catch(err => {
            next(err)
            console.log(err)
        })
})



module.exports = router
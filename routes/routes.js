const express = require('express'),
    router = express.Router();

module.exports = function(passport) {

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    })

    router.get('/profile', (req, res) => {
        res.render('profile');
    });

    router.post('/login', passport.authenticate('local', {
        session: true,
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}

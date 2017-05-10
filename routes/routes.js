const express = require('express'),
    router = express.Router(),
    blog = require('../models/blog.model');

module.exports = function (passport) {

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    })

    router.get('/profile', (req, res) => {
        blog
            .POSTS
            .getOtherUsersLatestPosts()
            .spread((result, metadata) => {
                console.log(result);
                blog
                    .POSTS
                    .getCurrentUserLatestPosts()
                    .spread((posts, metadata) => {
                        res.render('profile', {
                            myPostsCollection: posts,
                            otherPostsCollection: result
                        });
                    })
            })
    });

    router.get('/profile/post/:id', (req, res) => {
        blog
            .POSTS
            .getPostById(req.params.id)
            .spread((result, metadata) => {
                // TODO check for single post
                let post = result[0];
                post.id = req.params.id;
                blog
                    .RATES
                    .getCurrentUsersRate(post.id, req.query.userId)
                    .spread((result, metadata) => {
                        post.currentUsersRate = !!result.length;
                        blog
                            .COMMENTS
                            .getCommentsForPostByDetailId(post.detailID)
                            .spread((result, metadata) => {
                                res.render('post', {
                                    currentPost: post,
                                    postComments: result
                                });
                            });
                    })
            })
    });

    router.post('/profile/post/:id/newComment', (req, res) => {
        blog
            .COMMENTS
            .addComment(req.body.comment, req.query.ownerId, req.query.detailId);
        res.redirect('.');
    })

    router.post('/profile/post/:id/rate', (req, res) => {
        blog
            .RATES
            .setRate(req.body.rating, req.params.id, req.query.ownerId);
        res.redirect('../' + req.params.id + '?userId=' +global.User.id);
    })

    router.get('/profile/newPost', (req, res) => {
        res.render('newPost');
    });

    router.post('/profile/newPost', (req, res) => {
        blog
            .POSTS
            .addPost(req.body.title, req.body.content);
        res.redirect('/profile');
    });

    router.post('/login', passport.authenticate('local', {
        session: true,
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    router.get('/login/facebook', passport.authenticate('facebook', {scope: 'email'}));

    router.get('/login/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}

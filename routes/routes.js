const express = require('express'),
    router = express.Router(),
    blog = require('../models/blog.model'),
    posts = require('../models/post.model'),
    cache = require('../config/cache.js'), {POST_MODEL} = require('../config/constants');

module.exports = function (passport) {

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/login', (req, res) => {
        res.render('login');
    })

    router.get('/profile', (req, res) => {
        cache
            .getData
            .then((result) => {
                let responseOptions;
                if (!result) {
                    blog
                        .POSTS
                        .getAllPostsInfo()
                        .spread((result, metadata) => {
                            cache
                                .event
                                .emit("update-data", result);
                            responseOptions = {
                                myPostsCollection: posts.getCurrentUsersPosts(result),
                                otherPostsCollection: posts.getOtherUsersPosts(result)
                            };
                            res.render('profile', responseOptions);
                        })
                } else {
                    responseOptions = {
                        myPostsCollection: posts.getCurrentUsersPosts(JSON.parse(result)),
                        otherPostsCollection: posts.getOtherUsersPosts(JSON.parse(result))
                    };
                    res.render('profile', responseOptions);
                }
            })

    });

    router.get('/profile/post/:id', (req, res) => {
        cache
            .getData
            .then((result) => {
                let postInfo,responseOptions;
                if (!result) {
                    blog
                        .POSTS
                        .getAllPostsInfo()
                        .spread((result, metadata) => {
                            cache
                                .event
                                .emit("update-data", result);
                            postInfo = posts.getPostInfoById(req.params.id, result);
                            responseOptions = {
                                currentPost: {
                                    id: req.params.id,
                                    currentUsersRate: posts.isPostRatedByCurrentUser(req.params.id, result),
                                    averageRate: postInfo[POST_MODEL.POST_RATE],
                                    Title: postInfo[POST_MODEL.POST_TITLE],
                                    Name: postInfo[POST_MODEL.POST_AUTHOR],
                                    Date: postInfo[POST_MODEL.POST_CREATION_DATE],
                                    PostBody: postInfo[POST_MODEL.POST_CONTENT],
                                    detailID: postInfo[POST_MODEL.POST_DETAIL_ID]
                                },
                                postComments: posts.getPostCommentsByPostId(req.params.id, result)
                            };
                            res.render('post', responseOptions);
                        })
                } else {
                    postInfo = posts.getPostInfoById(req.params.id, JSON.parse(result));
                            responseOptions = {
                                currentPost: {
                                    id: req.params.id,
                                    currentUsersRate: posts.isPostRatedByCurrentUser(req.params.id, JSON.parse(result)),
                                    averageRate: postInfo[POST_MODEL.POST_RATE],
                                    Title: postInfo[POST_MODEL.POST_TITLE],
                                    Name: postInfo[POST_MODEL.POST_AUTHOR],
                                    Date: postInfo[POST_MODEL.POST_CREATION_DATE],
                                    PostBody: postInfo[POST_MODEL.POST_CONTENT],
                                    detailID: postInfo[POST_MODEL.POST_DETAIL_ID]
                                },
                                postComments: posts.getPostCommentsByPostId(req.params.id, JSON.parse(result))
                            };
                            res.render('post', responseOptions);
                }
            })

    });

    router.post('/profile/post/:id/newComment', (req, res) => {
        blog
            .COMMENTS
            .addComment(req.body.comment, req.query.ownerId, req.query.detailId);
        res.redirect('../' + req.params.id + '?userId=' + global.User.id);
    })

    router.post('/profile/post/:id/rate', (req, res) => {
        blog
            .RATES
            .setRate(req.body.rating, req.params.id, req.query.ownerId);
        res.redirect('../' + req.params.id + '?userId=' + global.User.id);
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

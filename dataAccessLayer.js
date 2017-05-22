const blog = require('./models/blog.model.js'),
    posts = require('./models/post.model.js'),
    cache = require('./config/cache.js'), {POST_MODEL, CACHE} = require('./config/constants'),
    data = {};

data.getProfileInfo = () => {
    return new Promise((resolve, reject) => {
        let responseOptions;
        cache
            .getData()
            .then((result) => {
                if (!result) {
                    blog
                        .POSTS
                        .getAllPostsInfo()
                        .spread((result, metadata) => {
                            cache
                                .event
                                .emit(CACHE.EVENTS.UPDATE_DATA, result);
                            responseOptions = {
                                myPostsCollection: posts.getCurrentUsersPosts(result),
                                otherPostsCollection: posts.getOtherUsersPosts(result)
                            };
                        })
                } else {
                    responseOptions = {
                        myPostsCollection: posts.getCurrentUsersPosts(JSON.parse(result)),
                        otherPostsCollection: posts.getOtherUsersPosts(JSON.parse(result))
                    };
                }
                resolve(responseOptions);
            })
    });
}

data.getPostById = (postId) => {
    return new Promise((resolve, reject) => {
        cache
            .getData()
            .then((result) => {
                let postInfo,
                    responseOptions;
                if (!result) {
                    blog
                        .POSTS
                        .getAllPostsInfo()
                        .spread((result, metadata) => {
                            cache
                                .event
                                .emit(CACHE.EVENTS.UPDATE_DATA, result);
                            postInfo = posts.getPostInfoById(postId, result);
                            responseOptions = {
                                currentPost: {
                                    id: postId,
                                    currentUsersRate: posts.isPostRatedByCurrentUser(req.params.id, result),
                                    averageRate: postInfo[POST_MODEL.POST_RATE],
                                    Title: postInfo[POST_MODEL.POST_TITLE],
                                    Name: postInfo[POST_MODEL.POST_AUTHOR],
                                    Date: postInfo[POST_MODEL.POST_CREATION_DATE],
                                    PostBody: postInfo[POST_MODEL.POST_CONTENT],
                                    detailID: postInfo[POST_MODEL.POST_DETAIL_ID]
                                },
                                postComments: posts.getPostCommentsByPostId(postId, result)
                            };
                        })
                } else {
                    postInfo = posts.getPostInfoById(postId, JSON.parse(result));
                    responseOptions = {
                        currentPost: {
                            id: postId,
                            currentUsersRate: posts.isPostRatedByCurrentUser(postId, JSON.parse(result)),
                            averageRate: postInfo[POST_MODEL.POST_RATE],
                            Title: postInfo[POST_MODEL.POST_TITLE],
                            Name: postInfo[POST_MODEL.POST_AUTHOR],
                            Date: new Date(Date.parse(postInfo[POST_MODEL.POST_CREATION_DATE])),
                            PostBody: postInfo[POST_MODEL.POST_CONTENT],
                            detailID: postInfo[POST_MODEL.POST_DETAIL_ID]
                        },
                        postComments: posts.getPostCommentsByPostId(postId, JSON.parse(result))
                    };
                }
                resolve(responseOptions);
            })
    });

};

data.addCommentToThePost = (content, ownerId, detailId) => {
    return new Promise((resolve, reject) => {
        blog
            .COMMENTS
            .addComment(content, ownerId, detailId)
            .spread((result, metadata) => {
                // CACHE update on comment adding
                blog
                    .POSTS
                    .getAllPostsInfo()
                    .spread((result, metadata) => {
                        cache
                            .event
                            .emit(CACHE.EVENTS.UPDATE_DATA, result, () => {
                                resolve();
                            });
                    });
            });
    });
}

data.setRateToThePost = (rating, postId, ownerId) => {
    return new Promise((resolve, reject) => {
        blog
            .RATES
            .setRate(rating, postId, ownerId)
            .spread((result, metadata) => {
                resolve();
            });
    });
}

data.addPost = (title, content) => {
    return new Promise((resolve, reject) => {
        blog
            .POSTS
            .addPost(title, content)
            .sread((result, metadata) => {
                blog
                    .POSTS
                    .getAllPostsInfo()
                    .spread((info, metadata) => {
                        cache
                            .event
                            .emit(CACHE.EVENTS.UPDATE_DATA, info, () => {
                                resolve();
                            });
                    });
            });
    })
}

module.exports = data;

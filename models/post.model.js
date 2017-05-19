const {POST_MODEL} = require('../config/constants');

let posts = {};

posts.getCurrentUsersPosts = (posts) => {
    let cachedIds = {},
        currentUsersPosts = posts.filter((item) => {
            if (!cachedIds[JSON.stringify(item[POST_MODEL.POST_ID])]) {
                cachedIds[JSON.stringify(item[POST_MODEL.POST_ID])] = true;
                return item[POST_MODEL.POST_AUTHOR_ID] === global.User.id;
            }
            return;
        });
    return currentUsersPosts.map((item) => {
        return {
            postId: item[POST_MODEL.POST_ID],
            Title: item[POST_MODEL.POST_TITLE]
        }
    })
}

posts.getOtherUsersPosts = (posts) => {
    let cachedIds = {},
        otherUsersPosts = posts.filter((item) => {
            if (!cachedIds[JSON.stringify(item[POST_MODEL.POST_ID])]) {
                cachedIds[JSON.stringify(item[POST_MODEL.POST_ID])] = true;
                return item[POST_MODEL.POST_AUTHOR_ID] !== global.User.id;
            }
            return;
        });
    return otherUsersPosts.map((item) => {
        return {
            postId: item[POST_MODEL.POST_ID],
            Title: item[POST_MODEL.POST_TITLE],
            Name: item[POST_MODEL.POST_AUTHOR]
        }
    })
}

posts.getPostInfoById = (postId, posts) => {
    let postInfo = {};
    postInfo[POST_MODEL.POST_TITLE] = null;
    postInfo[POST_MODEL.POST_AUTHOR] = null;
    postInfo[POST_MODEL.POST_CREATION_DATE] = null;

    for (let i = 0; i < posts.length; i++) {
        if (posts[i][POST_MODEL.POST_ID] === + postId) {
            postInfo[POST_MODEL.POST_TITLE] = posts[i][POST_MODEL.POST_TITLE];
            postInfo[POST_MODEL.POST_AUTHOR] = posts[i][POST_MODEL.POST_AUTHOR];
            postInfo[POST_MODEL.POST_CREATION_DATE] = posts[i][POST_MODEL.POST_CREATION_DATE];
            postInfo[POST_MODEL.POST_CONTENT] = posts[i][POST_MODEL.POST_CONTENT];
            postInfo[POST_MODEL.POST_DETAIL_ID] = posts[i][POST_MODEL.POST_DETAIL_ID];
            postInfo[POST_MODEL.POST_RATE] = posts[i][POST_MODEL.POST_RATE];
            break;
        }
    }
    return postInfo;
}

posts.getPostCommentsByPostId = (postId, posts) => {
    let currentPostInfo = posts.filter((item) => {
        return (item[POST_MODEL.POST_ID] === + postId && !!item[POST_MODEL.POST_COMMENT_AUTHOR_ID]);
    });

    return currentPostInfo.map((item) => {
        return {
            commentContent: item[POST_MODEL.POST_COMMENT_CONTENT],
            Date: new Date(Date.parse(item[POST_MODEL.POST_COMMENT_CREATION_DATE])),
            Name: item[POST_MODEL.POST_COMMENT_AUTHOR]
        }
    }).sort((a, b) => {
        return (a.Date.getTime() - b.Date.getTime())
    });
}

posts.isPostRatedByCurrentUser = (postId, posts) => {
    let isRated = null;
    posts.forEach((item) => {
        if (item[POST_MODEL.POST_ID] === + postId) {
            isRated = !!item[POST_MODEL.CURRENT_USERS_RATE];
        }
    });
    return isRated;
}

module.exports = posts;
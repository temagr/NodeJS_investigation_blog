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
            Title: item[POST_MODEL.POST_TITLE]
        }
    })
}

post.getPostTitleById = (postId, posts) => {
    let title = null;
    for(let i=0; i<posts.length; i++){
        if (posts[i][POST_MODEL.POST_ID] === postId){
            title = posts[i][POST_MODEL.POST_TITLE];
            break;
        }
    }
    return title ? title : "No title";
}

post.getPostAuthorNameByPostId = (postId, posts) => {
    let author = null;
    for(let i=0; i<posts.length; i++){
        if (posts[i][POST_MODEL.POST_ID] === postId){
            author = posts[i][POST_MODEL.POST_AUTHOR];
            break;
        }
    }
    return author ? author : "No author";
}

post.getPostCreationDateById = (postId, posts) => {
    let date = null;
    for(let i=0; i<posts.length; i++){
        if (posts[i][POST_MODEL.POST_ID] === postId){
            author = posts[i][POST_MODEL.POST_CREATION_DATE];
            break;
        }
    }
    return date ? date : "No dater";
}

post.isPostRatedByCurrentUser = (postId, posts) => {
    return posts.some((item) => {
        return item[POST_MODEL.POST_ID] === postId && item[POST_MODEL.POST_RATING_OWNER_ID] === global.User.id;
    })
}

post.getAverageRate = (postId, posts) => {
    let cacedRatingAuthor = {},
        result = posts.reduce((total, current) => {
            if (current[POST_MODEL.POST_ID] === postId && !!current[POST_MODEL.POST_RATE]) {
                if (!cacedRatingAuthor[JSON.stringify(current[POST_MODEL.POST_RATING_OWNER_ID])]) {
                    cacedRatingAuthor[JSON.stringify(current[POST_MODEL.POST_RATING_OWNER_ID])] = true;
                    total.summ += current[POST_MODEL.POST_RATE];
                    total.count++;
                }
            }
            return total;
        }, {
            summ: 0,
            count: 0
        });

        return result.count ? (result.summ/result.count) : null; 
}

module.exports = posts;
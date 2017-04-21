exports.BLOG = "Blog";

exports.tables = {
    BLOG: {
        USERS: "Users",
        POSTS: "Posts",
        POST_DETAILS: "PostDetails",
        COMMENTS: "Comments"
    }
}

exports.columns = {
    BLOG: {
        USERS: {
          USER_ID:'userId',
          NAME:'Name',
          EMAIL:'Email',
          PASSWORD:'Password'
        },
        POSTS: {
          POST_ID:'postId',
          TITLE:'Title',
          DATE:'Date',
          OWNER_ID:'OwnerID'
        },
        POST_DETAILS: {
          DETAIL_ID:'detailID',
          POST_ID:'postID',
          CONTENT:'PostBody'
        },
        COMMENTS: {
          COMMENT_ID:'commentID',
          COMMENT_CONTENT:'commentContent',
          DATE:'Date',
          COMMENT_OWNER_ID:'commentOwnerID',
          POST_DETAIL_ID:'postDetailId'
        }
    }
}

exports.POST_NUMBER = 20;

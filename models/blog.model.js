const DB = require('../config/constants'),
  config = require('../config/config.js').get(process.env.NODE_ENV);
const sql = require('sql-query');
  
var sqlQuery = sql.Query('mssql');

const dataBase = require('../database/database')(DB.BLOG, config.database.login, config.database.password, config.database.options),
  blog = {
    USERS: {},
    POSTS: {},
    COMMENTS: {},
    RATES: {}
  };

blog.USERS.getUserByCredentials = (username, password) => {
  var whereName = {}, wherePassword = {};
  
  whereName[DB.columns.BLOG.USERS.NAME] = username;
  wherePassword[DB.columns.BLOG.USERS.PASSWORD] = password;
  
  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.USERS).
                  select(DB.columns.BLOG.USERS.USER_ID, DB.columns.BLOG.USERS.NAME, DB.columns.BLOG.USERS.EMAIL, DB.columns.BLOG.USERS.PASSWORD).
                  where(whereName, wherePassword).
                  build());
}

blog.POSTS.addPost = (title, content) => {
  var setPost = {};

  setPost[DB.columns.BLOG.POSTS.TITLE] = title;
  setPost[DB.columns.BLOG.POSTS.DATE] = getDate();
  setPost[DB.columns.BLOG.POSTS.OWNER_ID] = global.User.id;

  return dataBase(`DECLARE @TranName VARCHAR(20);
                  SELECT @TranName = 'AddPost';
                  BEGIN TRANSACTION @TranName
                  DECLARE @CurrentPostID int;
                  ` +
                  sqlQuery.
                  insert().
                  into(DB.tables.BLOG.POSTS).
                  set(setPost).
                  build()
                  + `
                  SELECT @CurrentPostID = SCOPE_IDENTITY();
                  INSERT INTO [${DB.tables.BLOG.POST_DETAILS}] (${DB.columns.BLOG.POST_DETAILS.POST_ID},
                    ${DB.columns.BLOG.POST_DETAILS.CONTENT})
                  VALUES (
                    @CurrentPostID,
                    '${content}'
                  );
                  COMMIT TRANSACTION @TranName`);
}

blog.POSTS.getCurrentUserLatestPosts = () => {

  var whereUser = {};
  whereUser[DB.columns.BLOG.POSTS.OWNER_ID] = global.User.id;

  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.POSTS).
                  limit(DB.POST_NUMBER).
                  select(DB.columns.BLOG.POSTS.TITLE, DB.columns.BLOG.POSTS.POST_ID).
                  where(whereUser).
                  order(DB.columns.BLOG.POSTS.DATE, 'Z').
                  build());
}

blog.POSTS.getOtherUsersLatestPosts = () => {
  var wherePost = {};
  
  wherePost[DB.columns.BLOG.POSTS.OWNER_ID] = sql.ne(global.User.id);
  
  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.POSTS).
                  limit(DB.POST_NUMBER).
                  select(DB.columns.BLOG.POSTS.TITLE, DB.columns.BLOG.POSTS.POST_ID).
                  order(DB.columns.BLOG.POSTS.DATE, 'Z').
                  where(wherePost).
                  from(DB.tables.BLOG.USERS, DB.columns.BLOG.USERS.USER_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.OWNER_ID).
                  select(DB.columns.BLOG.USERS.NAME).
                  build());
}

blog.POSTS.getPostById = (id) => {
  var wherePost = {};

  wherePost[DB.columns.BLOG.POSTS.POST_ID] = id;

  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.POSTS).
                  select(DB.columns.BLOG.POSTS.TITLE, DB.columns.BLOG.POSTS.DATE).
                  where(wherePost).
                  from(DB.tables.BLOG.POST_DETAILS, DB.columns.BLOG.POST_DETAILS.POST_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.POST_ID).
                  select(DB.columns.BLOG.POST_DETAILS.CONTENT, DB.columns.BLOG.POST_DETAILS.DETAIL_ID).
                  from(DB.tables.BLOG.USERS, DB.columns.BLOG.USERS.USER_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.OWNER_ID).
                  build());
}

blog.POSTS.getAllPostsInfo = () => {

  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.POSTS).
                  select(DB.columns.BLOG.POSTS.POST_ID).as('postId').
                  select(DB.columns.BLOG.POSTS.TITLE).as('postTitle').
                  select(DB.columns.BLOG.POSTS.DATE).as('postCreationDate').
                  select(DB.columns.BLOG.POSTS.OWNER_ID).as('postAuthorId').
                  from(DB.tables.BLOG.POST_DETAILS, DB.columns.BLOG.POST_DETAILS.POST_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.POST_ID).
                  select(DB.columns.BLOG.POST_DETAILS.CONTENT).as('postContent').
                  select(DB.columns.BLOG.POST_DETAILS.DETAIL_ID).as('postDetailId').
                  from(DB.tables.BLOG.USERS, DB.columns.BLOG.USERS.USER_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.OWNER_ID).
                  select(DB.columns.BLOG.USERS.NAME).as('postAuthor').
                  from(DB.tables.BLOG.COMMENTS, DB.columns.BLOG.COMMENTS.POST_DETAIL_ID, DB.tables.BLOG.POST_DETAILS, DB.columns.BLOG.POST_DETAILS.DETAIL_ID, {joinType:'left'}).
                  select(DB.columns.BLOG.COMMENTS.COMMENT_CONTENT).as('postCommentContent').
                  select(DB.columns.BLOG.COMMENTS.DATE).as('postCommentCreationDate').
                  select(DB.columns.BLOG.COMMENTS.COMMENT_OWNER_ID).as('postCommentAuthorId').
                  from(DB.tables.BLOG.USERS, DB.columns.BLOG.USERS.USER_ID, DB.tables.BLOG.COMMENTS, DB.columns.BLOG.COMMENTS.COMMENT_OWNER_ID, {joinType:'left'}).
                  select(DB.columns.BLOG.USERS.NAME).as('postCommentAuthor').
                  from(DB.tables.BLOG.RATES, DB.columns.BLOG.RATES.POST_ID, DB.tables.BLOG.POSTS, DB.columns.BLOG.POSTS.POST_ID, {joinType:'left'}).
                  select(DB.columns.BLOG.RATES.RATE).as('postRate').
                  select(DB.columns.BLOG.RATES.RATE_ID).as('currentUsersRate').
                  build());

}

blog.COMMENTS.getCommentsForPostByDetailId = (id) => {
  var wherePost = {};
  wherePost[DB.columns.BLOG.COMMENTS.POST_DETAIL_ID] = id;

  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.COMMENTS).
                  select(DB.columns.BLOG.COMMENTS.COMMENT_CONTENT, DB.columns.BLOG.COMMENTS.DATE).
                  from(DB.tables.BLOG.USERS, DB.columns.BLOG.USERS.USER_ID, DB.tables.BLOG.COMMENTS, DB.columns.BLOG.COMMENTS.COMMENT_OWNER_ID).
                  select(DB.columns.BLOG.USERS.NAME).
                  where(wherePost).
                  build());
}

blog.COMMENTS.addComment = (comment, ownerId, detailId) => {
  var setForInsert = {};
  
  setForInsert[DB.columns.BLOG.COMMENTS.COMMENT_CONTENT] = comment;
  setForInsert[DB.columns.BLOG.COMMENTS.DATE] = getDate();
  setForInsert[DB.columns.BLOG.COMMENTS.COMMENT_OWNER_ID] = ownerId;
  setForInsert[DB.columns.BLOG.COMMENTS.POST_DETAIL_ID] = detailId;
  
  return dataBase(sqlQuery.
                  insert().
                  into(DB.tables.BLOG.COMMENTS).
                  set(setForInsert).
                  build());
}

blog.RATES.setRate = (rate, postId, userId) => {
  var setForInsert = {};
  
  setForInsert[DB.columns.BLOG.RATES.RATE] = rate;
  setForInsert[DB.columns.BLOG.RATES.POST_ID] = postId;
  setForInsert[DB.columns.BLOG.RATES.USER_ID] = userId;
  
  return dataBase(sqlQuery.
                  insert().
                  into(DB.tables.BLOG.RATES).
                  set(setForInsert).
                  build());
}

blog.RATES.getCurrentUsersRate = (postId, userId) => {
  var wherePost = {}, whereUser = {};
  
  wherePost[DB.columns.BLOG.RATES.POST_ID] = postId;
  whereUser[DB.columns.BLOG.RATES.USER_ID] = userId;
  
  return dataBase(sqlQuery.
                  select().
                  from(DB.tables.BLOG.RATES).
                  select(DB.columns.BLOG.RATES.RATE).
                  where(wherePost, whereUser).
                  build());
}

function getDate() {
  return new Date().toJSON().slice(0,10).replace(/-/g,'-') + ' ' + new Date().toTimeString().split(" ")[0];
}

module.exports = blog;

// blog.USERS.getUserByFacebookId = (id) => {   return dataBase(`SELECT
// userID,Name, facebookId FROM Users WHERE facebookId='${id}'`); }
//
// blog.USERS.addNewFacebookUser = (facebookId) => {   dataBase(`INSERT INTO
// Users (facebookId) VALUES (${facebookId})`); }
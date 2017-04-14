const express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    configAuth = require('./config/auth'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');
    dataBase = require('./database/database')('Blog', 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    });

let app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {} }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('local', new LocalStrategy((username, password, done) => {
    if(username == "admin" && password == "password") {
        return done(null, {
            id: 1,
            username: username
        });
    } else {
        return done(null, false);
    }
    // dataBase.query(`SELECT userID,username, password FROM Credentials WHERE username='${username}' and password='${password}'`).spread((result, metadata) => {
    //     console.log(result);
    //     if (result.length === 1) {
    //         return done(null, {
    //             id: result.userId,
    //             username: result.username
    //         });
    //     } else {
    //         return done(null, false);
    //     }
    // });
}))

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
})

// app.post('/submitted', passport.authenticate('local', {
//     session: true,
//     successRedirect: '/success',
//     failureRedirect: '/failure'
// }));
//
// app.get('/success', (req, res) => {
//     var session = req.session;
//     if (session.views) {
//         session.views++
//         res.write('<p>views: ' + session.views + '</p>')
//         res.write('<p>expires in: ' + (session.cookie.maxAge / 1000) + 's</p>')
//         res.end()
//     } else {
//         session.views = 1
//         res.write('<p> username:' + req.session.passport.user.username + '</p>');
//         res.end('welcome to the session demo. refresh!')
//     }
//     console.log(req.session);
// });
//
// app.get('/failure', (req, res) => {
//     res.send("Your authentication has failed");
// });

module.exports = app;

//Data Source=RUKAVITSINI\SQLEXPRESS01;Initial Catalog=Students;Integrated Security=True

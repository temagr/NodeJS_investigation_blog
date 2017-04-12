const express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    dataBase = require('./database')('Blog', 'admin', '123456', {
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

app.use(passport.initialize());

passport.use('local', new LocalStrategy((username, password, done) => {
    dataBase.query(`SELECT userID,username, password FROM Credentials WHERE username='${username}' and password='${password}'`).spread((result, metadata) => {
        console.log(result);
        if (result.length === 1) {
            return done(null, {
                id: result.userId,
                username: result.username
            });
        } else {
            return done(null, false);
        }
    });
}))

app.get('/', (req, res) => {
    return res.send("Server is started");
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/submitted', passport.authenticate('local', {
    session: false,
    successRedirect: '/success',
    failureRedirect: '/failure'
}));

app.get('/success', (req, res) => {
    res.send("Your authentication was successfull");
});

app.get('/failure', (req, res) => {
    res.send("Your authentication has failed");
});

module.exports = app;

//Data Source=RUKAVITSINI\SQLEXPRESS01;Initial Catalog=Students;Integrated Security=True

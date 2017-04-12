const express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    dataBase = require('./database')('Students', 'admin', '123456', {
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
    if (username !== "1234" && password !== "1234") {
        return done(null, false)
    } else {
        return done(null, {username, password});
    }
}))

app.get('/', (req, res) => {
    res.send("Server is started");
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login/submitted', passport.authenticate('local', {
    session: false,
    successRedirect: '/login/success',
    failureRedirect: '/login/failure'
}));

app.get('/login/success', (req, res) => {
    res.send("Your authentication was successfull");
});

app.get('/login/failure', (req, res) => {
    res.send("Your authentication has failed");
});

// dataBase.query('SELECT sID,sName FROM Student').spread((result, metadata) => {
//     console.time("Request");
//     console.log(result);
//     console.timeEnd("Request");
// });

module.exports = app;

//Data Source=RUKAVITSINI\SQLEXPRESS01;Initial Catalog=Students;Integrated Security=True

const express = require('express'),
    path = require('path'),
    dataBase = require('./database')('Students', 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    });

let app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
    res.send("Haha!");
});

app.get('/login', (req,res) =>{
  res.render('login');
})

dataBase
    .query('SELECT sID,sName FROM Student')
    .spread((result, metadata) => {
      console.time("Request");
      console.log(result);
      console.timeEnd("Request");
    });

module.exports = app;

//Data Source=RUKAVITSINI\SQLEXPRESS01;Initial Catalog=Students;Integrated Security=True

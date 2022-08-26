var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const corsOptions ={
//     origin:'http://127.0.0.1:3000', 
//     credentials:true,            
//     "Access-Control-Allow-Origin": "*",
//     optionSuccessStatus:200
// }


var app = express();


app.use(express.json())
app.use(cors());




app.locals.con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "bigtester",
    password: "123456",
    database: "dataserver1"

});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


app.listen(3001)


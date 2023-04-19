// npm install dotenv --save
require("dotenv").config();
// npm install http-errors --save
var createError = require('http-errors');
// npm install express --save
var express = require('express');
// npm install path --save
var path = require('path');
// npm install cookie-parser --save
var cookieParser = require('cookie-parser');
// npm install morgan --save
var logger = require('morgan');
// npm install cors --save
var cors = require('cors');
// npm install body-parser --save
var bodyParser = require('body-parser');
// imported database
const database = require('./app/db/db')
const rabbitMQ = require('./app/db/rabbitmq');
// creating app server from express
var app = express();
var compression = require('compression')

// compress all responses
app.use(compression())

// Auth router manages routing for application such as sign in, sign out,
// permissions, security tokens etc.
var PersonRouter = require('./app/routes/person.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// enabling cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type', 'authorization'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Origin': '*'
}));

app.use('/person', PersonRouter);

app.use(function (req, res, next) {
  // next(createError(404));
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// error handler 
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//MONGODB CONNECTION ESTABLISHMENT
database.mongoose.then(() => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Connected to Mongo");
    console.log("App is running ... \n");
    console.log("Press CTRL + C to stop the process. \n");
  }
}).catch(err => {
  console.error("App starting error:", err.message);
  process.exit(1);
});
//MONGODB CONNECTION ESTABLISHMENT

module.exports = app;

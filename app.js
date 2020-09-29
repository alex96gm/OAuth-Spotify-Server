const cors = require('cors'),
  express = require('express'),
  dotenv = require('dotenv'),
  bodyParser = require('body-parser'),
  createError = require('http-errors');

const exchangeRouter = require('./routes/exchange');
const refreshRouter = require('./routes/refresh');

var app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/exchange', exchangeRouter);
app.use('/refresh', refreshRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

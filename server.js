const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const axios = require('axios').default
require('./config/passport')(passport);
require('dotenv').config({ path: './config/.env' });

connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

app.use(flash());

// app.use('/', mainRoutes);


app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on port ${process.env.PORT}, you better catch it!`
    );
  });
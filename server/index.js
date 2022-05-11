// import express
const express = require('express');

// import all middlewares
const middlewaresConfig = require('./config/middlewares');

// import the routes
const {  UsersRoutes,TweetRoutes } = require('./modules');


// import database
const dbConfig = require('./config/db');

// creating the app
const app = express();

/**
 * Database
 * **/
dbConfig;

/**
 * middlewares
 * **/
middlewaresConfig(app);
// routes


// routes/paths
app.use('/api', UsersRoutes);
// app.use('/api', [  ]);


// creating/selecting a port
const PORT = process.env.PORT || 3000;


//Listens to port
app.listen(PORT, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // eslint-disable-next-line no-lone-blocks
    } else {
      // eslint-disable-next-line no-console
      console.log(`Our App listens to port: ${PORT}`);
    }
  });
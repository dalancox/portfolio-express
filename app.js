const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const rateLimit = require("express-rate-limit");

// Load config
dotenv.config({ path: './config/config.env' });

// connecting to DB

connectDB();

// Start Express
const app = express();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


//static folder
app.use(express.static(path.join(__dirname, 'public')));


//limit IPs to 100
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);

//Routes
app.use('/', require('./routes/index'));
app.use('/messages', require('./routes/message'));

// Port 
const PORT = process.env.PORT || 3000;

// Starting Server
app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);

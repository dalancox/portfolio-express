const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const rateLimit = require("express-rate-limit");

// Load config

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
    max: 200 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);

//Routes
app.use('/', require('./routes/index'));

// Port 
const PORT = process.env.PORT || 3000;

// Starting Server
app.listen(
    PORT,
    console.log(`Server running on mode on port ${PORT}`)
);

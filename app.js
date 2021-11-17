const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');

// Load config
dotenv.config({ path: './config/config.env' });

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

//Routes
app.use('/', require('./routes/index'));

// Port 
const PORT = process.env.PORT || 3000;

// Starting Server
app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);

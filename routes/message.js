const express = require('express');
const router = express.Router();

const Messages = require('../models/Messages');

// @desc  
// @route  
router.post('/', async (req, res) => {
    try {
        
        await Messages.create(req.body)
        res.redirect('/')
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

module.exports = router
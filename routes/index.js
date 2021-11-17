const express = require('express');
const router = express.Router();

// @desc  Main 
// @route  GET /
router.get('/', (req, res) => {
    res.render('dashboard', {
        layout: 'main'
    });
});


module.exports = router;
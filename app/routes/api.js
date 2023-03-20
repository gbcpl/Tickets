const express = require('express');
const router = express.Router();


router.use('/tickets', require('./ticket'));
//router.use('/login'), require('./login'); 

module.exports = router;
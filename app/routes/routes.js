const express = require('express');
const router = express.Router();
const sequelize = require('../config/database-config')

router.get('/:id', async function(req, res) {
    try {
        const sqlQuery = 'SELECT id, author FROM tickets WHERE id=?';
        const rows = await sequelize.query(sqlQuery, req.params.id);
        res.status(200).json(rows); 
    } catch (error) {
        res.status(400).send(error.message)
    }
    res.status(200).json({id:req.params.id})
})

module.exports = router;

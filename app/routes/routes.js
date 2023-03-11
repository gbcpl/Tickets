const express = require('express');
const router = express.Router();
const sequelize = require('../config/database-config')
const { QueryTypes } = require('sequelize');


router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM tickets WHERE id = ?';
        const rows = await sequelize.query(sqlQuery, {
            replacements: [req.params.id],
            type: QueryTypes.SELECT
          });
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;
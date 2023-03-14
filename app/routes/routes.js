const express = require('express');
const router = express.Router();
const app = express();  
const { QueryTypes } = require('sequelize');
const Tickets = require('../models/index.js');
const sequelize = require('../config/database-config')

app.use(express.json())
app.use('/tickets', router);

router.get('/count', async (req, res) => {
    try {
      const count = await Tickets.count();
      console.log(count)
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors du comptage des tickets.' });
    }
});

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

router.post('/register', async (req, res) => {
    try 
        {        
        const result = await Tickets.create({
            title: req.body.title,
            description: req.body.description,
            category: Number(req.body.category)
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});



module.exports = router;

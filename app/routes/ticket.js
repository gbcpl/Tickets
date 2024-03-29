const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database-config')

router.get('/count', async (req, res) => {
    try {
      const sqlQuery = 'SELECT COUNT(*) FROM tickets'
      const count = await sequelize.query(sqlQuery, {
        type: QueryTypes.SELECT
      })
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors du comptage des tickets.' });
    }
});

router.get('/categories', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM categories';
    const categories = await sequelize.query(sqlQuery, {
      type: QueryTypes.SELECT
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.get('/tags', async function(req,res){
  try {
      const sqlQuery = 'SELECT * FROM tickets WHERE category = 1';
      const rows = await sequelize.query(sqlQuery, {
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
        const sqlQuery = 'INSERT INTO tickets (title, description, category, createdDate) VALUES (:title, :description, :category, :createdDate)'
        const result = await sequelize.query(sqlQuery, {
          replacements: {
              title: req.body.title,
              description: req.body.description,
              category: Number(req.body.category),
              createdDate: req.body.createdDate
          },
          type: QueryTypes.INSERT
      });

        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error.message);
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





module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  const query = `SELECT * FROM "item";`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all items', err);
      res.sendStatus(500)
    })

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const description = req.body.description;
  const imgUrl = req.body.image_url;
  const userId = req.user.id;
  const sqlValues = [description, imgUrl, userId]
  const queryText = `
    INSERT INTO "item" 
    (description, image_url, user_id)
    VALUES ($1, $2, $3);
  `;
  
  pool
    .query(queryText,sqlValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('shelf post failed: ', err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  const userId = req.user.id;
  const itemId = req.params.id;
  const sqlValue = [itemId];
  const queryText = `
    DELETE FROM "item" 
    WHERE id = $1;
  `;
  pool
    .query(queryText, sqlValue)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('shelf delete failed: ', err);
      res.sendStatus(500);
    });
  
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;

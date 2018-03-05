const express = require('express');
const router = express.Router();

const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'postgres',
  port: 5432,
})

client.connect()

//GET HTTP method to /items
router.get('/', (req, res, next) => {
  client.query('SELECT * FROM items', (err, result) => {
    console.log(err, result)
    if (err) {
      return console.error('error running query', err);
    }
    res.send(result);
  })
});

//POST HTTP method to /items
router.post('/', (req,res,next) => {
  client.query('INSERT INTO items(title, description, category) VALUES($1, $2, $3) returning id', [req.body.title, req.body.description, req.body.category], (err, result) => {
    if(err) {
      res.json({success: false, message: `Failed to create a new item. Error: ${err}`});
    }
    res.json({success:true, message: "Added successfully."});
  });
});

//DELETE HTTP method to /items
router.delete('/:id', (req,res,next)=> {
  client.query('DELETE FROM items WHERE id = $1', [req.params.id], (err, result) => {
    if(err) {
      res.json({success: false, message: `Failed to delete a item. Error: ${err}`});
    }
    res.json({success:true, message: "Deleted successfully."});
  });
})

module.exports = router;


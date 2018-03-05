const express = require('express');
const router = express.Router();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
//const pg = require('pg');

const itemlist = require('./controllers/itemlist');


const port = 8000;


const app = express();

//Middleware for CORS
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routing all HTTP requests to /itemlist to itemlist controller
app.use('/items',itemlist);

app.get('/', (req,res) => {
    res.send("Invalid page");
})

//Listen to port 3000
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

/*const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'postgres',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})*/

module.exports = router;



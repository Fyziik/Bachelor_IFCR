const express = require('express');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.json())
app.use(express.static('public'));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rootbeer?',
  database: 'blackstone',
  port: 3308
});


//Search for specific admin
app.get('/admin', async (req, res) => {
  connection.execute(
    'SELECT * FROM admin WHERE `navn` = ?',
    ['Henrik'],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
});

//Find all admins
app.get('/admins', async (req, res) => {
  connection.query(
    'SELECT * FROM admin',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      res.send({data: results})
    }
  );
});

app.post('/test', async (req, res) => {
  console.log('inserting into admin db...')
  console.log(req.body)
});

//Should return blank error page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
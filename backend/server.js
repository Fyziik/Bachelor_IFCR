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
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

//Get user with relation data

//Get firm with all devices and vulnabilities.

//Update vulnabilities

//update devices


//Search for specific admin
app.get('/admin', async (req, res) => {
  connection.execute(
    'SELECT * FROM admin WHERE `name` = ?',
    ['Henrik'],
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );
});


//Search for admin with relation data (full get)
async function search_full_admin_db(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT admin.adminid, admin.name, 
      user.userid, user.email, 
      device.deviceid, device.hostname,
      vulnerability.vulnerabilityid, vulnerability.vulnerability_name, vulnerability.port 
      FROM admin
      JOIN user ON admin.adminid = user.administratorid
      JOIN device ON user.userid = device.asigned_user
      JOIN vulnerability ON device.deviceid = vulnerability.device_id
      WHERE admin.name = ?`,
      [data.username],
      function(err, results, fields) {
        if (results.length > 0) {
          console.log(results)
          resolve(results)
        }
        reject('None found')
      }
    );
  })
}

/* app.post('/adminwith', async (req, res) => {
  data = req.body
  console.log(data)
  response = await search_full_admin_db(data)
  res.send({"data": response})
}); */

app.post('/adminwith', async (req, res) => {
  data = req.body
  console.log(data)
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

async function search_user_db(data) {
  console.log('Searching users db...')
  return new Promise((resolve, reject) => {
    connection.execute(
      'SELECT * FROM user WHERE `email` = ? AND `password` = ?',
      [data.username, data.password],
      function(err, results, fields) {
        if (results.length > 0) {
          results[0].role = 'employee'
          resolve(results)
        }
        resolve(false)
      }
    );
  })
}

async function search_admin_db(data) {
  console.log('Searching admins db...')
  return new Promise((resolve, reject) => {
    connection.execute(
      'SELECT * FROM admin WHERE `navn` = ? AND `password` = ?',
      [data.username, data.password],
      function(err, results, fields) {
        if (results.length > 0) {
          results[0].username = results[0].navn
          delete results[0].navn
          results[0].role = 'admin'
          resolve(results)
        }
      }
    );
  })
}

//Attempt login
app.post('/login', async (req, res) => {
  //Try regular users first
  data = req.body
  let to_return = null
  to_return = await search_user_db(data)
  //If none found, try admin db
  if (!to_return) {
    to_return = await search_admin_db(data)
  }
  res.send({"data": to_return[0]})
});

//Should return blank error page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
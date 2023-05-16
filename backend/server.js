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
app.get('/adminwith', async (req, res) => {
  connection.execute(
    `SELECT admin.adminid, admin.name, 
    user.userid, user.email, 
    device.deviceid, device.hostname,
    vulnerability.vulnerabilityid, vulnerability.vulnerability_name, vulnerability.port, vulnerability.status_for_incident 
    FROM admin
    LEFT JOIN user ON admin.adminid = user.administratorid
    LEFT JOIN device ON user.userid = device.asigned_user
    LEFT JOIN vulnerability ON device.deviceid = vulnerability.device_id
    WHERE admin.name = ?`,
    ['Henrik'],
    function(err, results, fields) {
      res.send({data: results})
      console.log(results); // results contains rows returned by server
      if(err) console.log(err);
    }
  );
});


//update devices
app.get('/update', (req, res) => {
console.log("Update in progress..")
connection.execute(
  `UPDATE blackstone.device
  SET
  ip = ?,
  hostname = ?,
  asigned_user = ?
  WHERE deviceid = ?`,
  [12, "potatoHostname", 233111, 322111 ],
  function(err, results, fields) {
    if(err) console.log(err);
  }
  );
});

//Update vulnabilities
async function Update_vulnabilities(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `UPDATE blackstoneone.vulnerability,
      SET
      vulnerability_name = ?,
      target = ?,
      target_name = ?,
      port = ?,
      relevance = ?,
      QOD = ?,
      solution = ?,
      extern_references_for_solution = ?,
      proof = ?,
      status_for_incident = ?,
      false_positive = ?,
      step_guide_link = ?,
      vulnerabilitycol = ?,
      device_id = ?
      WHERE vulnerabilityid = ?`,
      [data.vulnerability_name, data.target, data.target_name, data.port, data.relevance, data.QOD, data.solution, data.extern_references_for_solution, 
        data.proof, data.status_for_incident, data.false_positive, data.step_guide_link, data.vulnerabilitycol, data.device_id, data.vulnerabilityid],
      function(err, results, fields) {
        console.log(results);
        if(err) console.log(err);
        if (!err) {
          resolve(results)
        }
        resolve(false)
      }
    );
  })
}


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
  console.log(to_return)
  res.send({"data": to_return[0]})
});

//Should return blank error page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
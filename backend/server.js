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

// we are missing exception handling and check for results.length <= 0. in case no result found.

//CORPORATION

//Search for specific corporation with relation data (full get)
app.post('/corporationwith', async (req, res) => {
  to_return = await get_full_db_corporation(req.body)
  res.send(to_return)
});

//Get corporation with relation data function
async function get_full_db_user(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT corporation.corporationid, corporation.name, corporation.cvr,
      admin.adminid, admin.email, 
      user.userid, user.email, 
      device.deviceid, device.hostname,
      vulnerability.vulnerabilityid, vulnerability.vulnerability_name, vulnerability.port, vulnerability.status_for_incident 
      FROM corporation
      LEFT JOIN admin ON corporation.corporationid = admin.corporationid
      LEFT JOIN user ON admin.adminid = user.administratorid
      LEFT JOIN device ON user.userid = device.asigned_user
      LEFT JOIN vulnerability ON device.deviceid = vulnerability.device_id
      WHERE corporation.corporationid = ?`,
      [corporation.corporationid],
      function(err, results, fields) {
        if (results.length > 0) {
          res.send(results);
          console.log(results); // remove this at some point.!
          resolve(results);
        }
      }
    );
  })
}


//ADMIN

//Search for specific admin with relation data (full get)
app.post('/adminwith', async (req, res) => {
  to_return = await get_full_db_admin(req.body)
  res.send(to_return)
});

//Get admin with relation data function
async function get_full_db_admin(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT admin.adminid, admin.email, 
      user.userid, user.email, 
      device.deviceid, device.hostname,
      vulnerability.vulnerabilityid, vulnerability.vulnerability_name, vulnerability.port, vulnerability.status_for_incident 
      FROM admin
      LEFT JOIN user ON admin.adminid = user.administratorid
      LEFT JOIN device ON user.userid = device.asigned_user
      LEFT JOIN vulnerability ON device.deviceid = vulnerability.device_id
      WHERE admin.adminid = ?`,
      [data.adminid],
      function(err, results, fields) {
        if (results.length > 0) {
          resolve(results)
        }
      }
    );
  })
}


//USER

//Search for specific user with relation data (full get)
app.post('/userwith', async (req, res) => {
  to_return = await get_full_db_user(req.body)
  res.send(to_return)
});

//Get user with relation data function
async function get_full_db_user(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT user.userid, user.email, user.role, user.administratorid, user.create_time,
      device.deviceid, device.ip, device.hostname, device.asigned_user,
      vulnerability.vulnerabilityid, vulnerability.vulnerability_name, vulnerability.port, vulnerability.status_for_incident 
      FROM user
      LEFT JOIN device ON user.userid = device.asigned_user
      LEFT JOIN vulnerability ON device.deviceid = vulnerability.device_id
      WHERE user.userid = ?`,
      [data.userid],
      function(err, results, fields) {
        if (results.length > 0) {
          res.send(results);
          console.log(results);
          resolve(results);
        }
      }
    );
  })
}


//DEVICE

//update/patch device
app.patch('/device', async (req, res) => {
  to_return = await patch_device(req.body)
  res.send(to_return)
});

async function patch_device(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `UPDATE blackstone.device
      SET
      ip = ?,
      hostname = ?,
      asigned_user = ?
      WHERE deviceid = ?`,
      [data.ip, data.hostname, data.asigned_user, data.deviceid],
      function(err, results, fields) {
        if (results.length > 0) {
          resolve(results)
        }
      }
    );
  })
}


//VULNABILITY

//Update/patch vulnability
app.patch('/vulnerability', async (req, res) => {
  to_return = await patch_vulnerability(req.body)
  res.send(to_return)
});

//This call seems to be working, but only if all the prepared statement variables are declared. NULL will not cut it f.eks.
//Maby look a bit more into sql patch calls, if only 1 value have to change how do we handle this so we dont have to update alot of the same values into the table.
async function patch_vulnerability(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `UPDATE blackstone.vulnerability
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
        if (results.length > 0) {
          resolve(results)
        }
      }
    );
  })
}


// der findes tredjeparts / middleware der kan håndtere meget af logging.
// initial logging function.
async function log_request(data) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO blackstone.logs ( message )
      VALUES ( ? ); `,
      [data],
    );
  })
}

//initial admin calls to get info. remember to clean up later after they have been abused

//Search for specific admin
app.get('/admin', async (req, res) => {
  connection.execute(
    'SELECT * FROM admin WHERE `adminid` = ?',
    [122222],
    function(err, results, fields) {
      log_request(req.body); // logging function used to log the request body ----------
    }
  );
});

//Find all admins
app.get('/admins', async (req, res) => {
  console.time('adminsgettime'); // definition / declaration of console.time
  connection.query(
    'SELECT * FROM admin',
    function(err, results, fields) {
      res.send({data: results})
    }
  );
  console.timeEnd('adminsgettime'); // console.log ish function that logs the console.endtime 
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
      'SELECT * FROM admin WHERE `email` = ? AND `password` = ?',
      [data.email, data.password],
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
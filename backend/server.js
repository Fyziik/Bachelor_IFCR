const express = require('express');
const { body, validationResult } = require('express-validator');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ph69grw.mongodb.net/?retryWrites=true&w=majority`;
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function adminsDatabaseCRUD(path, data_to_insert=null) {
  await client.connect();

  const dbName = "authentication"
  const collectionName = "admins"

  const database = client.db(dbName)
  const collection = database.collection(collectionName)

  try {
    if (path === 'get') { //retrieve from DB
      const cursor = await collection.find({})
      to_return = []
      await cursor.forEach(credentials => {
        to_return.push(credentials)
      })
      return to_return
    } else if (path === 'post') { //insert into DB
      let result =  await collection.insertOne(data_to_insert)
      return result
    }
  } catch (err) {
    console.error(err)
  }
}

app.get('/admin', async (req, res) => {
  console.log('Searching admin db...')
  res.send({
    success: true,
    data: await adminsDatabaseCRUD('get')
  })
});

app.post('/admin', async (req, res) => {
  console.log('inserting into admin db...')
  console.log(req.body)
  //Insert the data into the db
  let result = await adminsDatabaseCRUD('post', req.body)
  res.send(result).status(204)
});

//Should return blank error page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
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
app.use(express.static('public'));


async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  await client.connect();

  const dbName = "authentication"
  const collectionName = "admins"

  const database = client.db(dbName)
  const collection = database.collection(collectionName)

  try {
    const cursor = await collection.find({})
    await cursor.forEach(credentials => {
      console.log(credentials)
    })
  } catch (err) {
    console.error(err)
  }
}
run().catch(console.dir);


function getDataFromDB() {

}

app.get('/db', (req, res) => {
  console.log('Searching db...')
  res.send({
    success: true,
    data: getDataFromDB()
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});
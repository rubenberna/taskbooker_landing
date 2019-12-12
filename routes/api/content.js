const express = require('express');
const mongodb = require('mongodb');

const router = express.Router()

// 
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://redcarrots:mongoeasy@cluster0-tujv2.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Get content from mongodb
router.get('/', (req, res) => {
  res.send('hello')
})

module.exports = router

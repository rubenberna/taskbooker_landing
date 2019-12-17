const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const testdata = require('../data.js');

const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB_NAME
const colName = process.env.MONGODB_COLLECTION

const loadContent = async (key) => {
  try {
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const collection = client.db(dbName).collection(colName)
    const data = await collection.find({URL: key}).toArray()
    return data
  } catch (e) {
    console.log(e);
  }
}


module.exports = loadContent

// module.exports = (key) => {
//   let k = key.replace(/\//g, "_").replace(/\./g, "_");
//   return Promise.resolve([testdata["content"][k]]);
// }

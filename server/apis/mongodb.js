const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const testdata = require('../data.js');

const url = process.env.MONGODB_URL
const dbName = process.env.MONGODB_DB_NAME
const colName = process.env.MONGODB_COLLECTION

const loadPageContent = async (key) => {
  try {
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const collection = client.db(dbName).collection(colName)
    const data = await collection.find({URL: key}).toArray()
    return data
  } catch (e) {
    console.log(e);
  }
}

const getTableContent = async () => {
  try {
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const collection = client.db(dbName).collection(colName)
    const data = await collection.find({}).project({URL: 1, Breadcrumb1: 1, Breadcrumb2: 1, Breadcrumb3: 1, CityPostalcode: 1}).toArray()
    return data
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  loadPageContent,
  getTableContent
}

// module.exports = (key) => {
//   let k = key.replace(/\//g, "_").replace(/\./g, "_");
//   return Promise.resolve([testdata["content"][k]]);
// }

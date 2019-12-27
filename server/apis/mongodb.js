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
    client.close()
    return data
  } catch (e) {
    console.log(e);
  }
}

const getTableContent = async () => {
  try {
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const collection = client.db(dbName).collection(colName)
    const data = await collection.find({Breadcrumb2: '', Breadcrumb3: ''}).project({URL: 1, Breadcrumb1: 1, Breadcrumb2: 1, Breadcrumb3: 1, Province: 1, CityPostalcode: 1}).toArray()
    client.close()
    return data
  } catch (e) {
    console.log(e);
  }
}

const getIds = async () => {
  try {
    const client = await mongodb.MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const collection = client.db(dbName).collection(colName)
    const data = await collection.find({}).project({URL: 1}).toArray()
    client.close()
    return data
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  loadPageContent,
  getTableContent,
  getIds
}

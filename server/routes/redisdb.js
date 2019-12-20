const express = require('express');
const router = express.Router()
const redisClient = require('../config/redisClient');

router.post('/', async (req, res) => {
  let { limitResults } = req.body
  let tablecontent = await redisClient.fetchPageContent('tableContent')
  let shortlist = tablecontent.splice(0, +limitResults)
  let cities = tablecontent.map( t => t.CityPostalcode)
  let categories = tablecontent.map(t => (t.Breadcrumb1, t.Breadcrumb2, t.Breadcrumb3))
  let uniqueCategories = [...new Set(categories)]
  let uniqueCities = [...new Set(cities)]
  let finalObj = {
    shortlist,
    uniqueCities,
    uniqueCategories
  }
  res.status(200).send(finalObj)
})

router.post('/filter', async (req, res) => {
  const filters = req.body
  let tableContent = await redisClient.fitlerTable(filters)
  res.status(200).send(tableContent)
})
module.exports = router;

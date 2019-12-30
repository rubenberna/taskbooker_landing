const express = require('express');
const router = express.Router()
const redisClient = require('../config/redisClient');

router.post('/', async (req, res) => {
  let { limitResults } = req.body
  let tablecontent = await redisClient.fetchPageContent('tableContent')
  let shortlist = tablecontent.splice(0, +limitResults).sort()
  let provinces = tablecontent.map( t => t.Province)
  let categories = tablecontent.map(t => t.Breadcrumb1)
  let uniqueCategories = [...new Set(categories)].sort()
  let uniqueProvinces = [...new Set(provinces)].sort()
  let finalObj = {
    shortlist,
    uniqueProvinces,
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

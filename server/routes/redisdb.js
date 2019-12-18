const express = require('express');
const router = express.Router()
const redisClient = require('../config/redisClient');

router.post('/', async (req, res) => {
  let { limitResults } = req.body
  let tablecontent = await redisClient.fetchPageContent('tableContent')
  let shortlist = tablecontent.splice(0, +limitResults)
  res.status(200).send(shortlist)
})

router.post('/filter', async (req, res) => {
  const filters = req.body
  let tableContent = await redisClient.fitlerTable(filters)
  res.status(200).send(tableContent)
})
module.exports = router;

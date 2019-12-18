const express = require('express');
const router = express.Router()
const redisClient = require('../config/redisClient');

router.get('/', async (req, res) => {
  let tablecontent = await redisClient.fetchPageContent('tableContent')
  res.status(200).send(tablecontent)
})

module.exports = router;

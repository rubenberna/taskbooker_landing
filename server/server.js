const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const redisClient = require('./config/redisClient');
const mongodb = require('./apis/mongodb');
const PORT = process.env.PORT || 3131

app.use(express.static('./dist'));
app.use(express.json());

// load routes
const queryRedis = require('./routes/redisdb');
app.use('/queryRedis', queryRedis)

// Load view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

async function getContent(req, res, next) {
  if (req.params[0].indexOf('.') > 0) {
      res.sendFile(req.params[0]);
  } else {
    console.log('get content');
    let key = `www.taskbooker.be${req.params[0]}`
    let content = await mongodb.loadPageContent(key)
    if (content.length){
      res.render('index', { ...content[0] });
      redisClient.setPageContent(key, JSON.stringify(content[0]))
      let tableContent = await mongodb.getFilterTableContent()
      redisClient.setPageContent('tableContent', JSON.stringify(tableContent))
    } else res.redirect('https://www.taskbooker.be/')
  }
}

async function cache(req, res, next) {
  console.log('cache');
  const params = req.params[0]
  if (params.length > 1 ) {
    let key = `www.taskbooker.be${req.params[0]}`
    let pageContent = await redisClient.fetchPageContent(key)
    if(pageContent !== null) res.render('index', {...pageContent})
    else next()
  } else res.redirect('https://www.taskbooker.be/')
}

app.get('*', cache, getContent)

app.get('/server/sitemap.xml', (req, res) => (
  res.status(200).sendFile('sitemap.xml')
));

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

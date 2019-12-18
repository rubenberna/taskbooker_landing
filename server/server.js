let express = require('express');
require('dotenv').config();
let path = require('path');
let app = express();
const redisClient = require('./config/redisClient');
const mongodb = require('./apis/mongodb');
const PORT = process.env.PORT || 3131

// load routes
const queryRedis = require('./routes/redisdb');
app.use('/queryRedis', queryRedis)

app.use(express.static('./dist'));

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
    let tableContent = await mongodb.getTableContent()
    if (content){
      redisClient.setPageContent(key, JSON.stringify(content[0]))
      redisClient.setPageContent('tableContent', JSON.stringify(tableContent))
      res.render('index', { ...content[0] });
    }
    else res.send('invalid params');
  }
}

async function cache(req, res, next) {
  console.log('cache');
  let key = `www.taskbooker.be${req.params[0]}`
  let pageContent = await redisClient.fetchPageContent(key)
  let tablecontent = await redisClient.fetchPageContent('tableContent')
  if(pageContent !== null) res.render('index', {...pageContent})
  else next()
}

app.get('*', cache, getContent)

app.get('/server/sitemap.xml', (req, res) => (
  res.status(200).sendFile('sitemap.xml')
));

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

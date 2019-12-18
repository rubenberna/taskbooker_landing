let express = require('express');
let path = require('path');
require('dotenv').config();
let app = express();
const redis = require('redis');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3131
const REDIS_PORT = process.env.PORT || 6379

const loadContent = require('./apis/mongodb');
const client = redis.createClient({port: REDIS_PORT, password: 'aljezur99'});
const redisClient = require('./config/redisClient');


app.use(express.static('./dist'));

// Load view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

async function getContent(req, res, next) {
  if (req.params[0].indexOf('.') > 0) {
      res.sendFile(req.params[0]);
  } else {
    let key = `www.taskbooker.be${req.params[0]}`
    let content = await loadContent(key)
    if (content){
      redisClient.setContent(key, JSON.stringify(content[0]))
      res.render('index', { ...content[0] });
    }
    else res.send('invalid params');
  }
}

async function cache(req, res, next) {
  let key = `www.taskbooker.be${req.params[0]}`
  let data = await redisClient.fetchContent(key)
  if(data !== null) res.render('index', {...data})
  else next()
}

app.get('*', cache, getContent)

app.get('/server/sitemap.xml', (req, res) => (
  res.status(200).sendFile('sitemap.xml')
));

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

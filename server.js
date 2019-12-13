let express = require('express');
require('dotenv').config();
let app = express();
let data = require('./data.js');
let loadContent = require('./apis/mongodb');
let fetchTaskers = require('./apis/taskers');

app.use(express.static('.'));

// Load view engine
app.set('view engine', 'pug');

app.get('*', async (req, res) => {
  console.log(req.params[0]);
    if (req.params[0].indexOf('.') > 0) {
      console.log("responding with file");
      res.sendFile(req.params[0]);
    } else {
        let key = `www.taskbooker.be${req.params[0]}`
        const data = await loadContent(key)
        fetchTaskers()
      if (data)
        res.render('index', { ...data[0] });
      else
        res.end('invalid params');
    }
  })
  app.get('/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml')
  ));
app.listen(3131, () => {
    console.log("listening to port 3131");
});

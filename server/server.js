let express = require('express');
let path = require('path');

require('dotenv').config();
let app = express();
let loadContent = require('./apis/mongodb');

app.use(express.static('./dist'));

// Load view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.get('*', async (req, res) => {
    if (req.params[0].indexOf('.') > 0) {
      res.sendFile(req.params[0]);
    } else {
        let key = `www.taskbooker.be${req.params[0]}`
<<<<<<< HEAD:server.js
        const content = await loadContent(key)
        
=======
        let content = await loadContent(key)
>>>>>>> 2578b273177cc231052f559aec7de087e8eb0c72:server/server.js
      if (content)
        res.render('index', { ...content[0] });
      else
        res.end('invalid params');
    }
  })
  app.get('/server/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml')
  ));
app.listen(3131, () => {
    console.log("listening to port 3131");
});

let express = require('express');
require('dotenv').config();
let app = express();
let loadContent = require('./apis/mongodb');
import compression from "compression";
// let fetchTaskers = require('./apis/taskers');

app.use(express.static('.'));
app.use(compression());

// Load view engine
app.set('view engine', 'pug');

app.get('*', async (req, res) => {
    if (req.params[0].indexOf('.') > 0) {
      res.sendFile(req.params[0]);
    } else {
        let key = `www.taskbooker.be${req.params[0]}`
        const content = await loadContent(key)
      //  const taskers = await renderTaskers(req.params[0])
      if (content)
        res.render('index', { ...content[0] });
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


// const renderTaskers = async (params) => {
//   let categoriesList = params.split('/')

//   // disregard if last param is location
//   let lastCategory = categoriesList.length === 4 ? categoriesList[categoriesList.length -2] : categoriesList[categoriesList.length -1]
//   const taskers = await fetchTaskers(lastCategory)
//   console.log(taskers);
//   return taskers
// }

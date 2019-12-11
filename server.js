let express = require('express');
let app = express(); 
let data = require('./data.js');

app.use(express.static('.'));
app.set('view engine', 'pug');

app.get('*', function (req, res) {
  console.log(req.params[0]);
    if (req.params[0].indexOf('.') > 0) {
      console.log("responding with file");
      res.sendFile(req.params[0]);
    } else {
      // map the params to the data
      let key = "www_taskbooker_be" + req.params[0].replace(/\//g, "_");
      if (data.content[key])
        res.render('index', { ...data.content[key]});
      else 
        res.end('invalid params');
    }
  })

app.listen(3131, () => {
    console.log("listening to port 3131");
}); 
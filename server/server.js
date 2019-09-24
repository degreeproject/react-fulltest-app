const express = require('express');
const config = require('./config');

const user = require('./router/api/user');
const recipe = require('./router/api/recipe');

const app = express();


app.use('/api/user', user);
app.use('/api/recipe', recipe)


const port = config.PORT;

if(process.env.NODE_ENV === 'production'){

  app.use(express.static(__dirname + "/../dist/"));

  app.get(/.*/, function(req, res){
      res.sendFile(__dirname + "/../dist/index.html")
  });
}
app.listen(port, () => console.log(`Server running on port ${port}`));
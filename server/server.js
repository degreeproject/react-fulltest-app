const express = require('express');
const config = require('./config');
const winston = require('winston')
const user = require('./router/api/user');
const recipe = require('./router/api/recipe');
const csp = require(`helmet-csp`)

const app = express();


app.use('/api/user', user);
app.use('/api/recipe', recipe)

app.use(csp({
  directives: {
    defaultSrc: [`*`],
    imgSrc: [`'self'`],
  }
}))


const port = config.PORT;

if(process.env.NODE_ENV === 'production'){

  app.use(express.static(__dirname + "/../dist/"));

  app.get(/.*/, function(req, res){
      res.sendFile(__dirname + "/../dist/index.html")
  });
}
app.listen(port, () => console.log(`Server running on port ${port}`));
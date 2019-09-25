const express = require('express');
const config = require('./config');
const winston = require('winston')
const user = require('./router/api/user');
const recipe = require('./router/api/recipe');
const helmet = require(`helmet`)

const app = express();
app.use(helmet)


app.use('/api/user', user);
app.use('/api/recipe', recipe)

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [`'self'`],
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
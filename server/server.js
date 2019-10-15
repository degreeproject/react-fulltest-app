const express = require('express');
const config = require('./config');
const path = require('path')
const bodyParser = require('body-parser');

const user = require('./router/api/user');
const recipe = require('./router/api/recipe');
const auth = require('./router/api/auth');
const guard =  require('./helpers/guard');

const app = express();
const port = config.PORT;


app.use(bodyParser.json());

/* Authenticates each request */
app.use(/\/api\/.{1,}/, guard);

app.use('/api/user', user);
app.use('/api/recipe', recipe);
app.use('/api/auth', auth);

/**
 * If NODE_ENV is set to production the server will take responsibility for serving 
 * the built version of the app located in the build directory.
 */
if (process.env.NODE_ENV === 'production') {

  app.use(express.static(__dirname + "/../build/"));

  app.get(/.*/, function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../build/index.html"))
  });
}
// eslint-disable-next-line no-console  
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
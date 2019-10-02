const express = require('express');
const config = require('./config');
const path = require('path')
const bodyParser = require('body-parser');

const user = require('./router/api/user');
const recipe = require('./router/api/recipe');
const auth = require('./router/api/auth');

const app = express();

app.use(bodyParser.json());


app.use('/api/user', user);
app.use('/api/recipe', recipe);
app.use('/api/auth', auth)


const port = config.PORT;

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(__dirname + "/../dist/"));

  app.get(/.*/, function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../dist/index.html"))
  });
}
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}`));
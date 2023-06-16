require('dotenv').config();

const port = process.env.PORT;

const app = require('./server');

app.listen(port);

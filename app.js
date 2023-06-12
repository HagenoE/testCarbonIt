require('dotenv').config();

const port = process.env.PORT;

const app = require('./server');

app.listen(port);

// TODO :
// - creer les premiers test
// - coder la logique
//  faire la doc
//  creer la page d'acceuil

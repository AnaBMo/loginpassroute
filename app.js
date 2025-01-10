const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const middlewares = require('./middlewares');
const routes = require('./routes');
dotenv.config();
const app = express();
const PORT = 4000;

middlewares.setupAPP(app);
routes.setup(app);

app.listen(PORT, () => {
console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
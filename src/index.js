const express = require('express');
const routes = require('./routes');
const {globalErrorHandler} = require('./middleware/globalError');

const app = express();

app.use(express.json());

app.use('/api',routes);

app.use(globalErrorHandler);

module.exports = {
    app
}
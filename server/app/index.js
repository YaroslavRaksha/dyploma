const express = require('express');
const session = require('express-session');
const { apiLimiter } = require('./lib/apiLimiter');
const getError = require('./utils/getError');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config()

app.use(cookieParser());
app.use(session({
    secret: 'Session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'lax',
    }
}));

app.use(apiLimiter);
app.use(express.json());

app.use('/user', require('./routes/user'));
app.use('/store', require('./routes/store'));
app.use('/products', require('./routes/products'));
app.use('/analytics', require('./routes/analyitcs'));
app.use('/storeSettings', require('./routes/storeSettings'));

app.all('*', (req, res) =>
    res.status(404).json(getError('rest', 404, 'Not found')));

app.use(require('./middleware/errorHandler'));

module.exports = app;

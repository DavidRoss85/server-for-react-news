const express = require('express');
const app = express();
require('dotenv').config();

const newsRouter = require('./routes/newsRouter');
const userRouter = require('./routes/userRouter');

app.use('/news',newsRouter);
app.use('/user', userRouter);
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is an express server');
});

exports.newsFeedServer = app;

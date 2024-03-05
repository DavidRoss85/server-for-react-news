const myNews = require('../src/newsAPI')
const express = require('express');
const newsRouter = express.Router();


newsRouter.use(express.json())
newsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.appendHeader('Access-Control-Allow-Origin', '*');
        res.appendHeader('Access-Control-Allow-Credentials', 'true');
        res.appendHeader('Access-Control-Allow-Methods', '*');
        res.appendHeader('Access-Control-Allow-Headers', '*')
        next();
    })
    .get((req, res) => {
        console.log(`Received a GET request`)
        res.end(`{"test":"result"}`)
    })
    .put((req, res) => {
        console.log('Received a PUT request');
        res.end('{"test":"result"}');
    })
    .post((req, res) => {

        console.log('Recieved a post request', JSON.stringify(req.body));

        if (req.body.request === 'search' && !!req.body.data) {

            if (req.body.data.endpoint === 'top-headlines'|| req.body.data.endpoint === 'everything') {
                res.end(JSON.stringify(myNews.results(req.body.data)));

            } else {
                res.end('{"result":"unrecognized endpoint"}');

            }
            return;
        }


        //echo request
        res.end(JSON.stringify(req.body));
    })
module.exports = newsRouter;
const express = require('express'),
    bodyParser = require('body-parser'),
    awsServerlessExpressMiddleware = require('aws-serverless-express/middleware'),
    app = express(),
    path = require('path'),
    routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use((req, res, next) => {
    if(
        req.apiGateway &&
        req.apiGateway.event &&
        req.apiGateway.event.pathParameters &&
        req.apiGateway.event.pathParameters.proxy
    ) {
        req.url = path.join('/', req.apiGateway.event.pathParameters.proxy);
    }
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(routes);

app.use(function(req, res, next) {
    res.send(req.apiGateway.event || { msg: 'req.apiGateway is undefined'});
});

module.exports = app;
'use strict';

const awsServerlessExpress = require('aws-serverless-express'),
    app = require('./app'),
    server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

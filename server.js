const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static(__dirname + '/dist/client'));


app.use('/operation', createProxyMiddleware({
  target: 'http://operations.us-east-1.elasticbeanstalk.com',
  changeOrigin: true,
  logLevel: 'debug',
}));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/client/index.html'));});
app.listen(process.env.PORT || 8080);

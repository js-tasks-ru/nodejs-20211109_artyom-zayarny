const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { on } = require('events');

const server = new http.Server();

server.on('request', (req, res) => {
  const reqStr = req.url;
  const getFileName = reqStr.split('/').pop();

  const fileStream = fs.createReadStream(`./files/${getFileName}`);
  if (reqStr.split('/').length > 2) {
    res.statusCode = 400;
    res.end('Not allow nesting routes');
  }
  fileStream
    .on('error', (error) => {
      res.statusCode = 404;
      res.end(error.message);
      fileStream.destroy();
    })
    .pipe(res);
});

module.exports = server;

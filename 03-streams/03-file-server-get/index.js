const server = require('./server');
const stream = fs.createReadStream(filepath);
stream.pipe(res);
stream.on('error', (error) => {
  if (error.code === 'ENOENT') {
    res.statusCode = 404;
    res.end('File not found');
  } else {
    res.statusCode = 500;
    res.end('Internal server error');
  }
});
req.on('aborted', () => {
  stream.destroy();
});
server.on('request', (req, res) => {
  const pathname = req.url;
  if (pathname.includes('/') || pathname.includes('..')) {
    res.statusCode = 400;
    res.end('Nested paths are not allowed');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

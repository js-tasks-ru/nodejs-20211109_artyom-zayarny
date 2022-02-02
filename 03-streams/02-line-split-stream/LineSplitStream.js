const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.mem = '';
  }

  _transform(chunk, encoding, callback) {
    const chunkStr = chunk.toString();
    for (const char of chunkStr.split('')) {
      if (char === os.EOL) {
        this.push(mem);
        this.mem = '';
      } else {
        this.mem += char;
      }
    }
    callback();
  }

  _flush(callback) {
    callback();
  }
}

module.exports = LineSplitStream;

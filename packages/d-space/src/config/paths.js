const fs = require('fs');
const path = require('path');

// This cannot import paths from platform because platform uses ESM and this file must run without
// transpilation
const dir = path.resolve(fs.realpathSync(process.cwd()));

const root = path.resolve(__dirname, '../../../../');

module.exports = Object.assign({}, {
  root,
  local: path.resolve(dir),
  build: path.resolve(dir, 'build'),
});

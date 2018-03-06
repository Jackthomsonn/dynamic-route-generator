const path = require('path')

module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  }
};
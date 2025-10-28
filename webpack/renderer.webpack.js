module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: require('./rules.webpack'),
  },
  stats: {
    errorDetails: true
  },
  devServer: {
    port: 3002,
  },
}
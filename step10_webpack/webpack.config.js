module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './main.js'],
  module: {
    rules: [
      { 
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ]
          }
        } 
      }
    ]
  }
}


module.exports = {
  mode: 'development',
  entry: './input.js',
  output: {
    filename: 'output.js'
  },
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
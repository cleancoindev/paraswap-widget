const path = require('path'),
  webpack = require('webpack'),
  Dotenv = require('dotenv-webpack');

const nodeExternals = require('webpack-node-externals');


module.exports = (env = process.env, dirname = __dirname) => ({
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  entry: path.resolve(dirname, '..', 'src/index.tsx'),
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(dirname, '..', 'dist'),
    library: '',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(env.API_URL),
      'process.env.PROVIDER_URL': JSON.stringify(env.PROVIDER_URL),
    }),
    new Dotenv()
  ]
});
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: { port: 3003, headers: { 'Access-Control-Allow-Origin': '*' } },
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'transferMfe',
      filename: 'remoteEntry.js',
      exposes: { './TransferApp': './src/App.jsx' },
      remotes: {
        sharedState: 'sharedState@http://localhost:3099/remoteEntry.js',
      },
      shared: {
        // See README: version-mismatch simulation.
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        '@mui/material': { singleton: true, requiredVersion: deps['@mui/material'] },
        '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'] },
        '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'] },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};

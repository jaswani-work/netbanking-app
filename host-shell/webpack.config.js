const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        // Resolved at runtime from each remote's remoteEntry.js manifest.
        sharedState: 'sharedState@http://localhost:3099/remoteEntry.js',
        signIn: 'signInMfe@http://localhost:3001/remoteEntry.js',
        accounts: 'accountsMfe@http://localhost:3002/remoteEntry.js',
        transfer: 'transferMfe@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        // singleton: true - one shared instance across all remotes.
        react: { singleton: true, requiredVersion: deps.react, eager: true },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'], eager: true },
        'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
        '@mui/material': { singleton: true, requiredVersion: deps['@mui/material'] },
        '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'] },
        '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'] },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};

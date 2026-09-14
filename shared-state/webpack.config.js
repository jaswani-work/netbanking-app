const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

// No UI of its own - exposes auth/notification state and the shared theme.
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3099,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: { publicPath: 'auto' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sharedState',
      filename: 'remoteEntry.js',
      exposes: {
        './authStore': './src/authStore.js',
        './useAuth': './src/useAuth.js',
        './notifications': './src/notifications.js',
        './theme': './src/theme.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development', // 'production' for production builds
  entry: './src/index.js', // Entry point of your React app
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    publicPath: '/',
  watchOptions: {
    ignored: /node_modules/,
      },
  },
  devtool: 'eval-source-map', // Faster source maps for development
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000, // Set your desired port
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Automatically open the browser
    historyApiFallback: true, // For single-page apps (SPA) with routing
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            cacheDirectory: true, // Enable caching for faster rebuilds
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource', // Faster handling for images
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the build folder before each build
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
    }),
    new BundleAnalyzerPlugin(), // (Optional) Helps analyze the bundle size
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JS and JSX extensions
  },
  cache: {
    type: 'filesystem', // Enable file system caching to speed up rebuilds
  },
};

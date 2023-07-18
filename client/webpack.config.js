// Requiring our webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js', // Main entry point for application.
      install: './src/js/install.js' // Look in here for the installation logic.
    },
    output: {
      filename: '[name].bundle.js', // Create the bundled files.
      path: path.resolve(__dirname, 'dist'), // Putting the bundled files here.
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Minifies the html document
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Creates the service worker for offline usage.
        swDest: 'src-sw.js', // Place where the service worker file.
      }),
      // This is a list of all of stuff in our build folder.
      new WebpackPwaManifest({
        name: 'Test Editing Extraordinaire', // can customize your name
        short_name: 'TEE',
        description: "It's a text editor I had to make for class :(",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        start_url: "/",
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("assets", "icons") // where this will land inside the build
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          // Include all .css files.
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Include all .mjs or .js files, except node modules.
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            // Takes new code and changes it to a more stable version of the code.
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

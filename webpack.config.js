var path = require('path');
var webpack = require('webpack');

module.exports = {
 entry: './client/src/main.jsx',
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader",
         query:
         {
               presets:['react']
         }
       }
     }
   ]
 },
 resolve: {
   extensions: ['*', '.js', '.jsx']
 },
 output: {
   path: __dirname + '/dist',
   publicPath: '/',
   filename: 'bundle.js'
 }
}

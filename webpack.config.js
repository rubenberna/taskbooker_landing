var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});

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
 plugins: [
   new webpack.DefinePlugin({
        'process.env.TASKBOOKER_API_KEY': JSON.stringify(process.env.TASKBOOKER_API_KEY)
    }),
  ],
 resolve: {
   extensions: ['*', '.js', '.jsx']
 },
 output: {
   path: __dirname + '/dist',
   publicPath: '/',
   filename: 'bundle.js'
 }
}

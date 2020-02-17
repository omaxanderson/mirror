const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entries = () => {
   let entries = {};

   glob.sync('components/*.js').map(f => `./${f}`).forEach(f => {
      const m = f.match(/\/([^\/]+)\.js$/);
      entries[m[1]] = ['@babel/polyfill', f];
   });

   return entries;
};

module.exports = {
   mode: 'development',
   entry: entries(),
   module: {
      rules: [
         {
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/react'],
                  plugins: [
                     "@babel/plugin-proposal-decorators",
                     "@babel/plugin-syntax-object-rest-spread",
                     "@babel/plugin-proposal-class-properties",
                     "@babel/plugin-syntax-dynamic-import",
                     "babel-plugin-dynamic-import-node",
                  ],
               },
            },
         },
         {
            test: /\.style\.s(a|c)ss$/,
            loader: [
               // 'style-loader', //  MiniCssExtractPlugin.loader,
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     modules: true,
                     sourceMap: true,
                     esModule: true,
                  },
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                  },
               },
            ],
         },
         {
            test: /\.s(a|c)ss$/,
            exclude: /\.style.(s(a|c)ss)$/,
            loader: [
               // 'style-loader', // : MiniCssExtractPlugin.loader,
               MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                  },
               },
            ],
         },
      ],
   },
   resolve: {
      extensions: ['.js', '.jsx', '.scss'],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css',
      }),
   ],
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public'),
   },
   node: {
      fs: 'empty',
      console: true,
   },
   performance: {
      hints: false,
   },
   devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      compress: true,
      port: 9000,
      hot: true,
   },
};

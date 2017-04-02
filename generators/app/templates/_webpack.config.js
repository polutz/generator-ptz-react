var path = require('path');

module.exports = {
    entry: './dist/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['./babelRelayPlugin'].map(require.resolve)
            }
        }]
    }
};

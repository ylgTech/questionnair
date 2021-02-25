module.exports = {
    entry: {
        main: './src/app.js',
    },
    output: {
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: '[name].bundle.js',
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: '[name].bundle.js',
        // `path` is the folder where Webpack will place your bundles
        path: './dist',
        // `publicPath` is where Webpack will load your bundles from (optional)
        publicPath: 'dist/'
    }
};
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'LogList': './src/log_list.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename(chunkData) {
            let name = chunkData.chunk.name.replace(/([A-Z])/g, (value) => '_' + value.toLowerCase()).substr(1);
            return `${name}.js`;
        },
        library: '[name]',
        libraryExport: '',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: {
        'iview/dist/iview': 'iview',
        // 'VueJsonPretty': 'VueJsonPretty',
        'axios': 'axios',
        'peacetrue-iview/src/components/page-table': {
            root: ['PeaceIview', 'PageTable'],
            commonjs: 'peacetrue-iview/src/components/page-table',
            commonjs2: 'peacetrue-iview/src/components/page-table',
            amd: 'peacetrue-iview/src/components/page-table'
        },
    }
};
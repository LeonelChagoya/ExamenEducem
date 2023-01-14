'use strict';

const path = require("path");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'ResultadoOperativo/index': './Views/ResultadoOperativo/index.jsx',
        'Formularios/index': './Views/Formularios/index.jsx',
        'CategoriaProductos/index': './Views/CategoriaProductos/index.jsx',
        'CatalogoEnsambles/index': './Views/CatalogoEnsambles/index.jsx',
        'Recursos/Index': './Views/Recursos/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: "Static/[name].js"
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: [
                "style-loader", "css-loader"
            ],
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
          },
        {
            test: /\.(png|svg|jpg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: "images"
                }
        },
        },
    ]},
    resolve: {
        extensions: [".js", ".jsx"]
    }
};
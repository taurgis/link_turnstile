'use strict';

var path = require('path');
var sgmfScripts = require('sgmf-scripts');

module.exports = [{
    mode: 'production',
    name: 'js',
    entry: sgmfScripts.createJsPath(),
    output: {
        path: path.resolve('./cartridges/plugin_turnstile/cartridge/static'),
        filename: '[name].js'
    }
}];

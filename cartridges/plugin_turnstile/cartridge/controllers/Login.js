'use strict';

var server = require('server');

server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    var Site = require('dw/system/Site');
    var currentSite = Site.getCurrent();

    var turnstileSiteKey = currentSite.getCustomPreferenceValue('turnstileSiteKey');

    res.setViewData({
        turnstileSiteKey: turnstileSiteKey
    });

    next();
});

module.exports = server.exports();

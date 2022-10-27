'use strict';

var server = require('server');

server.extend(module.superModule);

/**
 * Login-Show: Add the Site Key to the login page.
 * @name Turnstile/Login-Show
 * @function
 * @memberof Login
 * @param {querystringparameter} - rurl - Redirect URL
 * @param {querystringparameter} - action - Action on submit of Login Form
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
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

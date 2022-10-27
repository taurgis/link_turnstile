'use strict';

var { validate } = require('*/cartridge/scripts/helpers/turnstile');
var { logoutCustomer } = require('dw/customer/CustomerMgr');
var { url } = require('dw/web/URLUtils');

/**
 * Verifies a Turnstile token.
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateResponse(req, res, next) {
    var token = req.form['cf-turnstile-response'] || req.querystring['cf-turnstile-response'];
    var verificationResult = validate(token);

    if (!verificationResult) {
        logoutCustomer(false);

        res.redirect(url('CSRF-Fail'));
    }

    next();
}

/**
 * Verifies a Turnstile token for Ajax requests.
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateResponseAjax(req, res, next) {
    var token = req.form['cf-turnstile-response'] || req.querystring['cf-turnstile-response'];
    var verificationResult = validate(token);

    if (!verificationResult) {
        logoutCustomer(false);

        res.redirect(url('CSRF-AjaxFail'));
    }

    next();
}

module.exports = {
    validateResponse: validateResponse,
    validateResponseAjax: validateResponseAjax
};

'use strict';

/**
 * Verifies a Turnstile token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validate(req, res, next) {
    var turnstileHelper = require('*/cartridge/scripts/helpers/turnstile');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var URLUtils = require('dw/web/URLUtils');

    var token = req.form['cf-turnstile-response'] || req.querystring['cf-turnstile-response'];
    var verificationResult = turnstileHelper.validate(token);

    if (!verificationResult) {
        CustomerMgr.logoutCustomer(false);
        res.redirect(URLUtils.url('CSRF-Fail'));
    }

    next();
}

/**
 * Verifies a Turnstile token
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateAjax(req, res, next) {
    var turnstileHelper = require('*/cartridge/scripts/helpers/turnstile');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var URLUtils = require('dw/web/URLUtils');

    var token = req.form['cf-turnstile-response'] || req.querystring['cf-turnstile-response'];
    var verificationResult = turnstileHelper.validate(token);

    if (!verificationResult) {
        CustomerMgr.logoutCustomer(false);
        res.redirect(URLUtils.url('CSRF-AjaxFail'));
    }

    next();
}

module.exports.validate = validate;
module.exports.validateAjax = validateAjax;

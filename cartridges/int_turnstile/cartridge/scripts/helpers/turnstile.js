'use strict';

/**
 * Validate the token generated by the frontend by the Turnstile client-side JavaScript.
 *
 * @param {string} token The token to be validated.
 * @return {boolean} If a valid token is provided true is returned, otherwise false.
 */
function validate(token) {
    const turnstileService = require('*/cartridge/scripts/services/cloudflare/turnstileService');

    const turnstileVerificationService = turnstileService.createVerificationService();

    if (token && token.length > 0) {
        var verificationResult = turnstileVerificationService.call({
            response: token
        }).object;

        if (!verificationResult) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

module.exports = {
    validate: validate
};

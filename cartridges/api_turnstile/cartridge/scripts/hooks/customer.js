'use strict';

/**
 * Add Turnstile validation to the SCAPI customer registration.
 *
 * @param {{customer: {c_turnstileResponse : string}}} registration - The CustomerRegistration OCAPI object
 * @return {dw.system.Status} - The status
 */
exports.beforePOST = function beforePOST(registration) {
    var Status = require('dw/system/Status');

    if (request.isSCAPI()) {
        try {
            var Resource = require('dw/web/Resource');

            if (empty(registration.customer.c_turnstileResponse)) {
                return new Status(Status.ERROR, 'ERR-TS-01', Resource.msg('turnstile.errors.ERR-TS-01', 'turnstile', null));
            }

            var { validate } = require('*/cartridge/scripts/helpers/turnstile');

            var verificationResult = validate(registration.customer.c_turnstileResponse);

            if (!verificationResult) {
                return new Status(Status.ERROR, 'ERR-TS-02', Resource.msg('turnstile.errors.ERR-TS-02', 'turnstile', null));
            }
        } catch (e) {
            return new Status(Status.ERROR, 'ERR-TS-03', e.message);
        }
    }

    return new Status(Status.OK);
};

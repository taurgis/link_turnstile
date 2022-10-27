'use strict';

/**
 * Creates the local service to send a verification request
 *
 * @returns {dw.svc.Service} - The created service
 */
function createVerificationService() {
    var { createService } = require('dw/svc/LocalServiceRegistry');

    return createService('Cloudflare.Turnstile', {
        createRequest: function (svc, parameters) {
            var { toRequestBody } = require('../../helpers/form');

            var serviceCredentials = svc.getConfiguration().getCredential();
            var modifiedParameters = parameters;

            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

            modifiedParameters.secret = serviceCredentials.getPassword();
            modifiedParameters.remoteip = request.getHttpRemoteAddress();

            return toRequestBody(modifiedParameters);
        },
        parseResponse: function (svc, client) {
            if (client.statusCode === 200) {
                var response = JSON.parse(client.text);

                /**
                 * Check that the Customer ID in the session matches the one from Turnstile
                 * as an extra security check.
                 *
                 * Note: This can be expanded with your own logic by modifying the template
                 * "components/turnstile/widget.isml" and matching the logic here.
                 */
                if (response.cdata === session.getCustomer().getID()) {
                    return response.success;
                }
            }

            return false;
        },
        mockCall: function () {
            return {
                statusCode: 200,
                statusMessage: 'Success',
                text: JSON.stringify({
                    success: true
                })
            };
        }
    });
}

module.exports = {
    createVerificationService: createVerificationService
};

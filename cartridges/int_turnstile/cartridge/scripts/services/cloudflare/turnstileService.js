'use strict';

const ALLOWED_ACTIONS = [
    'account_login',
    'account_register'
];

/**
 * Creates the local service to send a verification request
 *
 * @returns {dw.svc.Service} - The created service
 */
function createVerificationService() {
    var ServiceRegistry = require('dw/svc/LocalServiceRegistry');

    return ServiceRegistry.createService('Cloudflare.Turnstile', {
        createRequest: function (svc, parameters) {
            var formHelper = require('../../helpers/form');
            var serviceCredentials = svc.getConfiguration().getCredential();
            var modifiedParameters = parameters;

            svc.setRequestMethod('POST');
            svc.addHeader('content-type', 'application/json');

            modifiedParameters.secret = serviceCredentials.getPassword();
            modifiedParameters.remoteip = request.getHttpHeaders().get('CF-Connecting-IP');

            return formHelper.toRequestBody(modifiedParameters);
        },
        parseResponse: function (svc, client) {
            if (client.statusCode === 200) {
                var response = JSON.parse(client.text);

                return response.success && (ALLOWED_ACTIONS.indexOf(response.action) >= 0);
            }

            return false;
        },
        mockCall: function () {
            return {
                statusCode: 200,
                statusMessage: 'Success',
                text: JSON.stringify({
                    success: true,
                    action: 'account_register'
                })
            };
        }
    });
}

module.exports = {
    createVerificationService: createVerificationService
};

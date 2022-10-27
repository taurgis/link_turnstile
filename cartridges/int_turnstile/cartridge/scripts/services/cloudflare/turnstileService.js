'use strict';

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
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

            modifiedParameters.secret = serviceCredentials.getPassword();
            modifiedParameters.remoteip = request.getHttpRemoteAddress();

            return formHelper.toRequestBody(modifiedParameters);
        },
        parseResponse: function (svc, client) {
            if (client.statusCode === 200) {
                var response = JSON.parse(client.text);

                return response.success;
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

'use strict';

/**
 * Convert object param to request body
 *
 * @param {Object} param - Param object
 * @return {string} The body string
 */
function toRequestBody(param) {
    var Encoding = require('dw/crypto/Encoding');
    var CONSTANTS = require('*/cartridge/scripts/util/constants');

    var body = [];
    Object.keys(param).forEach(function (key) {
        if (Array.isArray(param[key])) {
            var n = 0;
            param[key].forEach(function (arrayParam) {
                body.push(
                    [
                        key + '[' + n + ']',
                        Encoding.toURI(arrayParam, CONSTANTS.CHARSET)
                    ].join('=')
                );

                n += 1;
            });
        } else {
            var paramValue = param[key] === null ? '' : param[key];
            var encodedParamValue = Encoding.toURI(paramValue, CONSTANTS.CHARSET);

            body.push(
                [
                    Encoding.toURI(key, CONSTANTS.CHARSET),
                    encodedParamValue
                ].join('=')
            );
        }
    });

    return body.join(CONSTANTS.PARAMETER_SEPARATOR);
}

module.exports = {
    toRequestBody: toRequestBody
};

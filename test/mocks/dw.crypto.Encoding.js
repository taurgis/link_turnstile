'use strict';

module.exports = {
    createDiffHash: function () {
        return {
            toHex: function () {
                return 'ebd3b412b40c6289bc7fe4cec12f1907c50f4a7672a429f719efd3c9f6692d10';
            }
        };
    },
    createSameHash: function () {
        return {
            toHex: function () {
                return 'ebd3b412b40c6289bc7fe4cec12f1907c50f4a7672a429f719efd3c9f6692d19';
            }
        };
    },
    createEncodeDecodeURI: function () {
        return {
            toHex: function () {
                return 'ebd3b412b40c6289bc7fe4cec12f1907c50f4a7672a429f719efd3c9f6692d19';
            },
            // eslint-disable-next-line no-unused-vars
            fromURI: function (value, encoding) {
                return decodeURIComponent(value);
            },
            // eslint-disable-next-line no-unused-vars
            toURI: function (value, encoding) {
                return encodeURIComponent(value);
            }
        };
    },
    createValidatePaygent3dSecureAuthority: function () {
        return {
            toHex: function () {
                return 'aaaaaaaaa';
            }
        };
    }
};

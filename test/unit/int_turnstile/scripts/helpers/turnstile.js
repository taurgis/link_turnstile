'use strict';

const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();

let resultMock = true;
const turnstileHelper = proxyquire('../../../../../cartridges/int_turnstile/cartridge/scripts/helpers/turnstile', {
    '*/cartridge/scripts/services/cloudflare/turnstileService': {
        createVerificationService: () => {
            return {
                call: () => {
                    return {
                        object: resultMock
                    };
                }
            };
        }
    }
});

describe('turnstileHelper', function () {
    describe('validate', function () {
        beforeEach(() => {
            resultMock = true;
        });

        it('should validate a token', function () {
            assert.equal(turnstileHelper.validate('token'), true);
        });

        it('should validate a invalid token', function () {
            resultMock = false;
            assert.equal(turnstileHelper.validate('token'), false);
        });

        it('should validate an empty token', function () {
            resultMock = false;
            assert.equal(turnstileHelper.validate('token'), false);
        });
    });
});

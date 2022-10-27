'use strict';

const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const form = proxyquire('../../../../../cartridges/int_turnstile/cartridge/scripts/helpers/form', {
    'dw/crypto/Encoding': require('../../../../mocks/dw.crypto.Encoding').createEncodeDecodeURI(),
    '*/cartridge/scripts/util/constants': require('../../../../../cartridges/int_turnstile/cartridge/scripts/util/constants')
});

describe('formHelper', function () {
    describe('toRequestBody', function () {
        it('should be set an assumed value', function () {
            assert.strictEqual(form.toRequestBody({
                a: 'a:b',
                c: 'c&d',
                e: null
            }), 'a=a%3Ab&c=c%26d&e=');
        });
    });

    describe('toRequestBodyWithArray', function () {
        it('should be set an assumed value', function () {
            var param = { a: [] };
            param.a[0] = 'b=1';
            param.a[1] = 'b[2]';
            param.c = 'd';
            assert.strictEqual(form.toRequestBody(
                param
            ), 'a[0]=b%3D1&a[1]=b%5B2%5D&c=d');
        });
    });
});

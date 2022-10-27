'use strict';

var server = require('server');
var turnstile = require('*/cartridge/scripts/middleware/turnstile');

server.extend(module.superModule);

server.prepend('Login', turnstile.validateAjax);
server.prepend('SubmitRegistration', turnstile.validateAjax);

module.exports = server.exports();

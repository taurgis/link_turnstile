'use strict';

module.exports = {
    loginError: function () {
        $('form.login').on('login:error', function () {
            if (turnstile) {
                turnstile.reset('#ts-login');
            }
        });
    },
    registerError: function () {
        $('form.registration').on('login:register:error', function () {
            if (turnstile) {
                turnstile.reset('#ts-register');
            }
        });
    }
};

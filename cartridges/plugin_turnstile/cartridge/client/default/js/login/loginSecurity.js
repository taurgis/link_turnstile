'use strict';

module.exports = {
    loginError: function () {
        /**
         * Reset Turnstile on errors - otherwise a token is missing in the form submits that follow.
         */
        $('form.login').on('login:error', function () {
            if (turnstile) {
                turnstile.reset('#ts-login');
            }
        });
    },
    registerError: function () {
        /**
         * Reset Turnstile on errors - otherwise a token is missing in the form submits that follow.
         */
        $('form.registration').on('login:register:error', function () {
            if (turnstile) {
                turnstile.reset('#ts-register');
            }
        });
    }
};

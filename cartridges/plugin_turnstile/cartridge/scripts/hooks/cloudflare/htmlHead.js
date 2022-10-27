'use strict';

/**
 * Adds the Client Side JS for Turnstile.
 */
function htmlHead() {
    var { renderTemplate } = require('dw/template/ISML');

    renderTemplate('cloudflare/turnstileTag');
}

module.exports = {
    htmlHead: htmlHead
};

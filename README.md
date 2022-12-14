# link_turnstile: Storefront Reference Architecture (SFRA)
[![CI](https://github.com/taurgis/link_turnstile/actions/workflows/build-test.yml/badge.svg)](https://github.com/taurgis/link_turnstile/actions/workflows/build-test.yml)
[![codecov](https://codecov.io/gh/taurgis/link_turnstile/branch/main/graph/badge.svg?token=K6P22BDFT8)](https://codecov.io/gh/taurgis/link_turnstile)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the repository for the link_turnstile plugin. 

# Demo
![](docs/login.jpg)

# SFRA

## Cartridge Path Considerations
The link_turnstile plugin requires the app\_storefront\_base cartridge. In your cartridge path, include the cartridges in the following order:

```
plugin_turnstile:int_turnstile:app_storefront_base
```

# Composable Storefront / Headless Applications

## Enable SCAPI Hooks
By default hooks are not enabled for SCAPI. To enable this feature go to

```
Administration > Global Preferences > Feature Switches
```

![](docs/scapi-hooks.jpg)

## Cartridge Path Considerations
In your cartridge path, include the cartridges in the following order:

```
api_turnstile:int_turnstile
```

# Getting Started

1. Clone this repository. (The name of the top-level folder is link_turnstile.)
2. In the top-level link_turnstile folder, enter the following command: `npm install`. (This command installs all of the package dependencies required for this plugin.)
3. In the top-level link_turnstile folder, edit the paths.base property in the package.json file. This property should contain a relative path to the local directory containing the Storefront Reference Architecture repository. For example:
```
"paths": {
    "base": "../storefront-reference-architecture/cartridges/app_storefront_base/"
}
```
4. In the top-level link_turnstile folder, enter the following command: `npm run compile:js`
5. In the top-level link_turnstile folder, enter the following command: `npm run uploadCartridge`

For information on Getting Started with SFRA, see [Get Started with SFRA](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fsfra%2Fb2c_sfra_setup.html).

# Metadata

## Services
To contact Cloudflare Turnstile it is required to configure a service. A file containing the required
configuration can be imported in the business manager. The file is located here `metadata/services.xml`.

### Set the password (secret key)
The password for the service needs to be set manually in the Business Manager, this is the secret key. The secret key will be provisioned alongside the sitekey when you create a widget.

![](/docs/turnstile-service-pw.jpg)

## Site Preferences
A new preference is added to the `Site Preferences` system object. The file `metadata/site-preferences.xml` can be
imported as a System Object Type in the business manager.

In the import file you can replace the siteKey attribute with your own Site Key which you received when provisioning the widget.

# NPM scripts
Use the provided NPM scripts to compile and upload changes to your sandbox.

## Compiling your application

* `npm run compile:js` - Compiles all js files and aggregates them.

**Note:** The plugin cartridge must be compiled after compiling storefront-reference-architecture (SFRA base) cartridge.

## Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project.

## Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid dw.json file at the root that is configured for the sandbox to upload.

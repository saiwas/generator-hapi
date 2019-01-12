'use strict';

const packageInfo = require(__dirname + '/../package.json');

/**
 * Manifest for the Service.
 */
const manifest = {
    server: {
        app: {
            slogan: packageInfo.description
        },
        debug: {
            request: ['error']
        },
        port  : process.env.NODE_ENV === 'develop' ? 3000 : 80,
        routes: {
            cors: true
        }
    },
    register: {
        plugins: [
            {
                plugin: 'inert'
            },
            {
                plugin: 'vision'
            },
            {
                plugin : 'hapi-swagger',
                options: {
                    info: {
                        title  : packageInfo.name,
                        version: packageInfo.version
                    },
                    documentationPath: '/specs',
                    jsonEditor       : false
                }
            },
            {
                plugin : require('./plugins/test-plugin/plugin'),
                options: require('./config')
            }
        ]
    }
};

/**
 * Export the Instance to the World
 */
module.exports = manifest;

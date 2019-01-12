// Reference `https://github.com/hapijs/glue/blob/master/API.md`

'use strict';

require('dotenv').config();
require('newrelic');

const Glue     = require('glue');
const Manifest = require('./manifest');

const startService = async function() {
    try {
        const server = await Glue.compose(Manifest, { relativeTo: __dirname });
        await server.start();
        server.log(['log'], 'Service started');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startService();

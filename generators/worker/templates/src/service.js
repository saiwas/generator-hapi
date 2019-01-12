'use strict';

require('dotenv').config();
require('newrelic');

const Worker = require('./worker-event/implement');

const startService = async () => {
    try {
        let eventWorker = new Worker();
        return await eventWorker.start();
    } catch (err) {
        console.error(['error'], err);
        process.exit(1);
    }
};

startService();

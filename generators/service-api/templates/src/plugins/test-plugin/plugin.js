'use strict';

const entryPoints = require('./entrypoints');

const Plugin = function Plugin() {
    this.options = {};
};


Plugin.prototype = Object.assign(Plugin.prototype, {
    config: require('./methods/config'),
    hello : require('./methods/hello')
});

const register = async function(server, options) {
    const instance = new Plugin();
    instance.config(options);

    return await entryPoints(server, instance);
};

module.exports = {
    name   : '<%= appName %>',
    version: '1.0.0',
    register
};

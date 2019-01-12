'use strict';

const entryPoints = function(server, plugin) {
    server.bind(plugin);

    server.route({
        method : 'GET',
        path   : '/hello',
        handler: plugin.hello,
        config : {
            tags       : ['api'],
            description: 'Test API'
        }
    });
};

module.exports = entryPoints;

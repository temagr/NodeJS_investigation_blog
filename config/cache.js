const redis = require('redis'),
    client = redis.createClient(),
    events = require('events'),
    {CACHE} = require('./constants.js');
    cache = {};

client.on('connect', function () {
    console.log('connected');
});

cache.update = (data) => {
    client.set(CACHE.STORAGE.APP_DATA, JSON.stringify(data), (err, reply) => {
        console.log("redis", reply);
    });
    console.log("updated");
};

cache.getData = new Promise((resolve, reject) => {
    client.get(CACHE.STORAGE.APP_DATA, (err, reply) => {
        if (err) {
            reject(err);
        } else {
            resolve(reply);
        }
    });
});

cache.event = new events.EventEmitter();
cache
    .event
    .on(CACHE.EVENTS.UPDATE_DATA, cache.update);

module.exports = cache;
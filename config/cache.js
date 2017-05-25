const redis = require('redis'),
    events = require('events'), {CACHE} = require('./constants.js'),
    client = redis.createClient(),
    cache = {};

if (process.env.NODE_ENV === "development") {
    client
        .on('connect', function () {
            console.log('connected');
        });
}

cache.update = (data, callback) => {
    client.set(CACHE.STORAGE.APP_DATA, JSON.stringify(data), (err, reply) => {
        if (process.env.NODE_ENV === "development") {
            console.log("redis", reply);
        }
        if (callback) {
            callback();
        };
    });
    if (process.env.NODE_ENV === "development") {
        console.log("updated");
    }
};

cache.getData = () => {
    return new Promise((resolve, reject) => {
        client.get(CACHE.STORAGE.APP_DATA, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    })
};

cache.event = new events.EventEmitter();
cache
    .event
    .on(CACHE.EVENTS.UPDATE_DATA, cache.update);

module.exports = cache;
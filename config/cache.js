const redis = require('redis'),
    events = require('events'), 
    {CACHE} = require('./constants.js'),
    cache = {};

if (process.env.NODE_ENV === "development") {
    client
        .on('connect', function () {
            console.log('connected');
        });
}

cache.update = (data, callback) => {
    let client = redis.createClient();
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
    client.quit();
};

cache.getData = new Promise((resolve, reject) => {
    let client = redis.createClient();
    client.get(CACHE.STORAGE.APP_DATA, (err, reply) => {
        console.log("GOT");
        if (err) {
            client.quit();
            reject(err);
        } else {
            client.quit();
            resolve(reply);
        }
    });
});

cache.event = new events.EventEmitter();
cache
    .event
    .on(CACHE.EVENTS.UPDATE_DATA, cache.update);

module.exports = cache;
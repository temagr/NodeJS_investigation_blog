const redis = require('redis'),
    client = redis.createClient(),
    events = require('events'),
    cache = {};

client.on('connect', function () {
    console.log('connected');
});

cache.update = (data) => {
    client.set("appData", JSON.stringify(data), (err, reply) => {
        console.log("redis", reply);
    });
    console.log("updated");
};

cache.getData = new Promise((resolve, reject) => {
    client.get("appData", (err, reply) => {
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
    .on('update-data', cache.update);

module.exports = cache;
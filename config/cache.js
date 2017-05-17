const redis = require('redis'),
    client = redis.createClient(),
    cache = {};

client.on('connect', function () {
    console.log('connected');
});

cache.update = (data) => {
    client.set("appData", JSON.stringify(data), (err, reply) => {
        console.log("redis", reply);
    })
}

// cache.getInfo = (key) => {
//     let result;
//     client.get("appData", (err,reply) => {
//     })
// }

module.exports = cache;
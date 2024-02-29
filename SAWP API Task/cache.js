// cache.js
const cache = {};

module.exports = {
    get: function (key) {
        return cache[key];
    },
    set: function (key, value) {
        cache[key] = {
            data: value,
            timestamp: Date.now()
        };
    }
};

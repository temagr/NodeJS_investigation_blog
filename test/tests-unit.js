
const {assert} = require('chai'),
      DB = require('../config/constants');


suite('Unit Tests', function () {
    test('Configuration', function() {
        assert(DB.BLOG === "Blog", "DataBase name is wrong");
    });
});

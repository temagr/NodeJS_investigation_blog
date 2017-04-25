var assert = require('chai').assert;
var DB = require('../../../config/constants');
suite('Unit Tests', function () {
    test('Configuration', function() {
        assert(DB.BLOG == "TestProject");
    });
});



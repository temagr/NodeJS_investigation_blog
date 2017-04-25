mocha.ui('tdd')
var assert = chai.assert;
suite('Global Tests', function () {
    test('Title does not contain dennied chars', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'Blank');
    })
    
    test('Title has a right name', function() {
        assert(document.title == "Blog");
    });
});



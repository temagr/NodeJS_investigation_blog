mocha.ui('tdd')
var assert = chai.assert;

suite('Profile Page Tests', function() {
  let links = document.getElementsByTagName('A');

    test('Title does not contain denied chars', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'Blank');
    })

    test('Title has a right name', function() {
        assert(document.title == "Profile");
    });

    test('Html markup has a bootstrap container', function() {
        let container = document.querySelectorAll('.container');
        assert(container.length >= 1, "No bootstrap container at the page")
    });

    test('Logout button exists', function() {
      assert([].some.call(links, function(item){
        return item.href.match(/\/logout$/);
      }), "No links for Logout");
    });

    test('New post creation button exists', function() {
      assert([].some.call(links, function(item){
        return item.href.match(/\/profile\/newPost$/);
      }), "No links for New Post Creation");
    });

});

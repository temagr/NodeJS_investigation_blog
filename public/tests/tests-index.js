mocha.ui('tdd')
var assert = chai.assert;

suite('Index Page Tests', function () {
    test('Title does not contain denied chars', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'Blank');
    })

    test('Title has a right name', function() {
        assert(document.title == "Blog");
    });

    test('Html markup has a bootstrap container', function(){
      let container = document.querySelectorAll('.container');
      assert(container.length>= 1, "No bootstrap container at the page")
    });

    test("A link for 'Local Login' presents", function(){
      let links = document.getElementsByTagName('A');

      assert([].some.call(links, function(item){
        return item.href.match(/\/login$/);
      }), "No links for Local Login");
    })
});

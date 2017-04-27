mocha.ui('tdd')
var assert = chai.assert;

suite('New Post Page Tests', function() {

    test('Title does not contain denied chars', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'Blank');
    })

    test('Title has a right name', function() {
        assert(document.title == "New Post");
    });

    test('Html markup has a bootstrap container', function() {
        let container = document.querySelectorAll('.container');
        assert(container.length >= 1, "No bootstrap container at the page")
    });

    test("Login form presence and attributes", function() {
      let formLogin = document.querySelectorAll('form[action=\"/profile/newPost\"][method=\"POST\"]');
      assert(formLogin.length === 1, "No forms for post creation request")
    });

    test("Control for input title", function() {
      let titleInput = document.getElementById('title');
      assert(!!titleInput, "No inputs for login");
      assert(titleInput.name === 'title', "Title input name attribute value is incorrect");
    });

    test("Control for input content", function() {
      let contentInput = document.getElementById('content');
      assert(!!contentInput, "No inputs for post content");
      assert(contentInput.name === 'content', "Post content input name attribute value is incorrect");
    });
    
});

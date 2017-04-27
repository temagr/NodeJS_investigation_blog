mocha.ui('tdd')
var assert = chai.assert;

suite('Login Page Tests', function() {
    test('Title does not contain denied chars', function() {
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'Blank');
    })

    test('Title has a right name', function() {
        assert(document.title == "Login form");
    });

    test('Html markup has a bootstrap container', function() {
        let container = document.querySelectorAll('.container');
        assert(container.length >= 1, "No bootstrap container at the page")
    });

    test("Login form presence and attributes", function() {
      let formLogin = document.querySelectorAll('form[action=\"/login\"][method=\"POST\"]');
      assert(formLogin.length === 1, "No forms for login request")
    });

    test("Control for input login", function() {
      let loginInput = document.getElementById('username');
      assert(!!loginInput, "No inputs for login");
      assert(loginInput.name === 'username', "Input name attribute value is incorrect");
    });

    test("Control for input password", function() {
      let passwordInput = document.getElementById('password');
      assert(!!passwordInput, "No inputs for password");
      assert(passwordInput.name === 'password', "Input name attribute value is incorrect");
    });
});

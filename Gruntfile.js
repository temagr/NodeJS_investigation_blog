module.exports = function(grunt) {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint'
        // 'grunt-exec'
    ].forEach(function(task) {
        grunt.loadNpmTasks(task);
    });
    
    grunt.initConfig({
        cafemocha: {
            all: {src: 'test/tests-*.js', options: {ui: 'tdd'} }
        },
        jshint: {
            app: ['index.js', 'config/**', 'database/database.js', 'models/**', 'routes/**'],
            qa: ['Gruntfile.js', 'test/**']
        }
    });

    grunt.registerTask('default', ['cafemocha', 'jshint']);
};
'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            src: ['service/**/*.js', '!node_modules/**/*.*'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['lint']);

};
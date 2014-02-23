module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner:
                '// Marionette.StateView\n' +
                '// --------------------\n' +
                '// v<%= pkg.version %>\n' +
                '// \n' +
                '// Copyright (c) <%= grunt.template.today("yyyy") %> Mattias Rydengren <mattias.rydengren@coderesque.com>\n' +
                '// Distributed under MIT license\n' +
                '\n'
        },

        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: 'src/marionette.stateview.js' ,
                dest: 'lib/marionette.stateview.js'
            }
        },

        jasmine: {
            src: 'src/marionette.stateview.js',
            options: {
                helpers: [
                    'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                ],
                vendor: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.marionette/lib/backbone.marionette.js'
                ],
                specs: 'spec/javascripts/marionette.stateview.spec.js'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ 'src/marionette.stateview.js' ]
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                sourceMap: true
            },
            dist: {
                files: {
                    'lib/marionette.stateview.min.js': [ 'src/marionette.stateview.js' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', [ 'jshint', 'jasmine' ]);
    grunt.registerTask('default', [ 'jshint', 'concat', 'uglify' ]);
};
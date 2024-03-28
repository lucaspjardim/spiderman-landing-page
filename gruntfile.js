module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'public/styles/main-min.css' : 'src/styles/main.less'
                }
            }
        },
        uglify: {
            options: {
                compress: true,
            },
            development: {
                files: {
                    'dev/scripts/main-min.js': ['src/js/main.js']
                }
            },
            production: {
                files: {
                    'public/scripts/main-min.js': ['src/js/main.js']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'public/'
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify:development']
            },
            html : {
                files: ['index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'CSS_ADDRESS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'JS_ADDRESS',
                            replacement: './scripts/main-min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            public: {
                options: {
                    patterns: [
                        {
                            match: 'CSS_ADDRESS',
                            replacement: './styles/main-min.css'
                        },
                        {
                            match: 'JS_ADDRESS',
                            replacement: './scripts/main-min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['index.html'],
                        dest: 'public/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy'); 

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'uglify:production', 'replace:public', 'copy']); 
};

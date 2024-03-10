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
            'dist/styles/main-min.css' : 'src/styles/main.less'
        }
    }
},
    watch: {
        less: {
            files: ['src/styles/**/*.less'],
            tasks: ['less:development']
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
                        replacement: './src/scripts/main.js'
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
        dist: {
            options: {
                patterns: [
                    {
                        match: 'CSS_ADDRESS',
                        replacement: './styles/main-min.css'
                    },
                    {
                        match: 'JS_ADDRESS',
                        replacement: './src/scripts/main-min.js'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }
            ]
        }
    }
})

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'replace:dist'])
}
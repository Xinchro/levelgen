module.exports = function(grunt) {

  grunt.initConfig({

    jspm: {
      options: {
        sfx: true,
        minify: false,
        mangle: false,
      },
      dev: {
        files: {
          './dist/app.js': './app.js',
        },
      }
    },
    clean: {
      build: {
        src: ['./dist/']
      }
    },
    watch: {
      files: ['app.js', './src/**/*.js'],
      tasks: ['default'],
      options: {
        interrupt: true,
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-jspm')
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'jspm'])
  grunt.registerTask('do', ['clean', 'jspm', 'watch'])

}
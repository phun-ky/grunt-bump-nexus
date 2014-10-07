module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodeunit : {
      all : ['test/test.js']
    },
    jshint: {
      files: [
        "tasks/**/*.js"
      ],
      options: {
        indent : 2,
        white : false,
        passfail: true
      }
    },
    shell: {
      build_changelog: {
        command: 'changelog.sh'
      }
    },
    watch: {
      files: [
        '<%= jshint.files.src %>'
      ],
      tasks: ['jshint', 'verb'],
      options : {
        debounceDelay: 2000,
        spawn : false
      }
    },
    bump : {
      options : {
        files : ['package.json'],
        updateConfigs : ['pkg'],
        commit : false,
        createTag : false,
        push : false
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-verb');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint', 'nodeunit']);

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('readme', ['shell:build_changelog','verb']);

  grunt.registerTask('build-patch', function(){

    grunt.task.run('bump-only:patch');
    grunt.task.run('readme');




  });


  grunt.registerTask('compile', ['jshint', 'nodeunit'] );



};

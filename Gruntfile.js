module.exports = function(grunt) {

   var shell = require('shelljs');

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
         scripts: {
            files: ['src/crossword.js'],
            tasks: ['compile']
         },
      },
   });

   grunt.registerTask('compile', function(){
      shell.exec('traceur --sourcemap --experimental --script src/crossword.js --out dist/crossword.js');
   });

   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.registerTask('default', ['compile', 'watch']);

};



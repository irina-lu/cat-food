module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-sass");

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/style.css": "sass/style.scss"
        }
      }
    }
  });
};

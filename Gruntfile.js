// module.exports = function(grunt) {
//   grunt.loadNpmTasks("grunt-sass");
//
//   grunt.initConfig({
//     sass: {
//       style: {
//         files: {
//           "css/style.css": "sass/style.scss"
//         }
//       }
//     }
//   });
// };
module.exports = function(grunt) {
const sass = require('node-sass');

require('load-grunt-tasks')(grunt);

grunt.initConfig({
    sass: {
        options: {
            implementation: sass,
            sourceMap: true
        },
        dist: {
            files: {
                'css/style.css': 'sass/style.scss'
            }
        },
    }
});

grunt.registerTask('default', ['sass']);
};

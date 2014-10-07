/*
 * grunt-bump-nexus
 * https://github.com/phun-ky/grunt-bump-nexus
 *
 * Copyright (c) 2014 Alexander Vassbotn Røyne-Helgesen
 * Licensed under the GPL license.
 */

'use strict';

var fs  = require('fs');
var path = require('path');
var ini = require('ini');
var semver    = require('semver');

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('bumpnexus', 'Task to bump nexus deployment files', function(release) {


    var options = this.options({
      backup : true
    });

    if(!options.project){

      grunt.fail.fatal('No project found to update!');

    }

    if(!options.version_identifier){

      grunt.fail.fatal('No version identifier found to bump!');

    }

    var src = grunt.file.expand(options.files).filter(function(filepath){

      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {

        grunt.log.warn('Source file "' + filepath + '" not found.');

        return false;

      } else {

        return true;

      }

    });

    if (src.length === 0) {

      grunt.log.warn('Could not bump nexus deployment file because src files were empty.');

      return;

    }

    if(options.backup){

      var _backup_dest = '';

      src.forEach(function(filepath){

        if(options.backup_dest){

          _backup_dest = path.normalize(options.backup_dest);

        } else {

          _backup_dest = path.dirname(filepath) + path.sep;

        }

        try{

        // Copy file from filepath to dest, append .bak
        fs.writeFileSync( _backup_dest + Date.now() + '_' + path.basename(filepath) + '.bak', fs.readFileSync(filepath));

        grunt.verbose.ok("Copyied file successfully to : '" + _backup_dest + Date.now() + '_' + path.basename(filepath) + '.bak' + "'")

        } catch(ex){

          grunt.fail.warn(ex);
        }

      });

    }

    release     = release || 'patch';

    if(
      release === 'major' ||
      release === 'minor' ||
      release === 'patch' ||
      release === 'prerelease' ||
      semver.valid(release)
    ){

      src.forEach(function(filepath){

        var config          = ini.parse(fs.readFileSync(filepath, 'utf-8'));
        var _config_version = config[ options.project ][ options.version_identifier ];

        if( semver.valid( _config_version ) ){

          grunt.verbose.ok("Version in '" + filepath + "': '" + _config_version + "' is valid, continuing..");

          config[ options.project ][ options.version_identifier ] = semver.inc( _config_version, release );

          try{

            fs.writeFileSync( filepath, ini.stringify( config ) );

            grunt.verbose.write("Wrote file: '"+ filepath +"' with updated version: '" + config[ options.project ][ options.version_identifier ] + "'" );

          } catch(e){

            grunt.fail.fatal("Could not write '" + filepath + "'!");
          }

        } else {

          grunt.fail.fatal("Version in '" + filepath + "': '" + _config_version + "' is NOT valid!");

        }


      });





    } else {

      grunt.fail.fatal('Could not update nexus configuration file for release: ' + release + ". Allowed releases are: 'major', 'minor', 'patch', 'prerelase' or a given valid semver version.");

    }

  });


};

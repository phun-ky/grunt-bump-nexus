Add something like this in your gruntfile:

    bumpnexus : {
      options : {
        files : [
          'test/inc/test_before.txt'
        ],
        backup : true,
        project : 'projectx',
        version_identifier : 'resource.maven.war.version'
      }
    },

# Options

## files *Required*

Type: `Array`

## backup

Type: `Boolean`
Default: `true`

## project *Required*

Type : `String`

## version_identifier *Required*

Type : `String`



___________

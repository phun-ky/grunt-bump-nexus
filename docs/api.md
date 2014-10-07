Add something like this in your gruntfile:

  bumpnexus: {
    files : {
      src: 'src/main/webapp/js/mustache/',
      dest: 'src/main/webapp/js/src/templates.js',
      options: {
        prefix: 'my.templates = ',
        postfix: ';',
        verbose: true
      }
    }
  }

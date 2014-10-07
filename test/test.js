/*jslint node: true */
'use strict';


var execOptions = {
  options : {
    backup : true,
    files : {
      u   : '../../../../jetty-server-test/deployments/alt-stb-002_deployment_client-u.txt',
      t   : '../../../../jetty-server-test/deployments/alt-stb-003_deployment_client-t.txt',
      ts  : '../../../../jetty-server-test/deployments/alt-stb-003_deployment_client-ts.txt'
    }
  }
};

exports.tests = {
  alwaws : function(test){
    test.expect(1);

    test.equal(true, true, "this better work");

    test.done();
  }
};

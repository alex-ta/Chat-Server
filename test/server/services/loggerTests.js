'use strict';

const assert = require('assertthat');
const logger = require('../../../server/services/logger');


suite('test for logger', function () {
  let count = 0;
  test((count++) + ') getter and setter', function (done) {
    logger.setLogFile(undefined)
    assert.that(logger.getLogFile()).is.equalTo('');
    done();
  });
  test((count++) + ') getter and setter', function (done) {
    logger.setLogFile(1)
    assert.that(logger.getLogFile()).is.equalTo('');
    done();
  });
  test((count++) +') getter and setter', function (done) {
    logger.setLogFile(function(){})
    assert.that(logger.getLogFile()).is.equalTo('');
    done();
  });
  test((count++) + ') getter and setter', function (done) {
    logger.setLogFile('logfile')
    assert.that(logger.getLogFile()).is.equalTo('logfile');
    done();
  });
});

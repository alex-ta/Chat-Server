'use strict';

const assert = require("assertthat");
const logger = require("../../../server/services/logger");


suite("test for logger", function () {
    test(" getter and setter", function (done) {
          logger.setLogFile("logfile")
          assert.that(logger.getLogFile()).is.equalTo("logfile");
          done();
    });
});

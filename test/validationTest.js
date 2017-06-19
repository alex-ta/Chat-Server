'use strict';

const assert = require('assertthat');
const validation = require('../../../server/shared/validation');


suite('Validation Test ', function() {
  let count = 0;
  test((count++) + ') UserNameIsNotEmpty', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      user: 123213
    })
    assert.that(isValid).is.equalTo(true);
    done();
  });
  test((count++) + ') PasswodIsNotEmpty', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: '123'
    })
    assert.that(isValid).is.equalTo(true);
    done();
  });
  test((count++) + ') PasswodIsNotEmpty', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: ''
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') UserNameIsEmpty', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      user: '',
      email: 'abc@abc.com',
      passwword: 'hey'
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') IsEmail', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      email: 'abc@abc.com',
      password: 'hey'
    })
    assert.that(isValid).is.equalTo(true);
    done();
  });
  test((count++) + ') IsNoEmailWithout@', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      email: 'abcb.com'
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') IsNoEmailWithout.', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      email: 'abcb@com'
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') IsNoEmailWithWWW', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      email: 'www.abcb@de'
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') EmailError', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      email: 'abcbde'
    })
    assert.that(errors.email).is.equalTo('email is invalid');
    done();
  });
  test((count++) + ') PwdConf', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: 'abc',
      passwordconf: 'abc'
    })
    assert.that(isValid).is.equalTo(true);
    done();
  });
  test((count++) + ') PwdConfFalse', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: 'abc',
      passwordconf: 'abcd'
    })
    assert.that(isValid).is.equalTo(false);
    done();
  });
  test((count++) + ') OnePwd', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: 'abc'
    })
    assert.that(isValid).is.equalTo(true);
    done();
  });
  test((count++) + ') PasswordError', function(done) {
    const {
      errors,
      isValid
    } = validation.val({
      password: 'abc',
      password2: 'hey'
    })
    assert.that(errors.password).is.equalTo('passwords must match');
    done();
  });
});

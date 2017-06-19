'use strict';

const assert = require('assertthat');
const Chatroom = require('../../../server/classes/Chatroom');


this.chatId;
this.messageHistory = [];
this.name;
this.description;
this.password;

const messageHistoryCount = 5;
const userPrototypes = [];


suite('test for chatroom ', function () {
  let count = 0;
  const chatroom = new Chatroom();
  test((count++) + ') chatId', function (done) {
    chatroom.chatId = 1;
    assert.that(chatroom.chatId).is.equalTo(1);
    done();
  });
  test((count++) + ') name', function (done) {
    chatroom.name = 'Room';
    assert.that(chatroom.name).is.equalTo('Room');
    done();
  });
  test((count++) + ') password', function (done) {
    chatroom.password = 123;
    assert.that(chatroom.password).is.equalTo('');
    done();
  });
  test((count++) + ') password', function (done) {
    assert.that(chatroom.password).is.equalTo('');
    done();
  });
  test((count++) + ') password', function (done) {
    chatroom.password = 'password';
    assert.that(chatroom.password).is.equalTo('password');
    done();
  });
  test((count++) + ') description', function (done) {
    chatroom.description = 'a chatroom';
    assert.that(chatroom.description).is.equalTo('a chatroom');
    done();
  });
});

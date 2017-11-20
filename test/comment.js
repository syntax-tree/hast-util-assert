'use strict';

var test = require('tape');
var assert = require('..');

test('assert(comment)', function (t) {
  t.throws(
    function () {
      assert({type: 'comment'});
    },
    /text should have `value`: `{ type: 'comment' }`$/,
    'should throw if a `comment` doesn’t have a value'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'comment', value: 'Alpha'});
    },
    'should allow `value`'
  );

  t.end();
});

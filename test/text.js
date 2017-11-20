'use strict';

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert(text)', function (t) {
  t.throws(
    function () {
      assert({type: 'text'});
    },
    /text should have `value`: `{ type: 'text' }`$/,
    'should throw if a `text` doesn’t have a value'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'text', value: 'Alpha'});
    },
    'should allow `value`'
  );

  t.end();
});

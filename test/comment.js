/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast-util-assert
 * @fileoverview Test suite for `hast-util-assert`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert(comment)', function (t) {
  t.throws(
    function () {
      assert({type: 'comment'});
    },
    /^AssertionError: text should have `value`: `{ type: 'comment' }`$/,
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

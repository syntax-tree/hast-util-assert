'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert(element)', function (t) {
  t.throws(
    function () {
      assert({type: 'element'});
    },
    /^AssertionError: parent should have `children`: `{ type: 'element' }`$/,
    'should throw if a `element` is not a parent'
  );

  t.throws(
    function () {
      assert({type: 'element', children: []});
    },
    /^AssertionError: `element` should have a `tagName`: `{ type: 'element', children: \[\] }`$/,
    'should throw if a `element` has no `tagName`'
  );

  t.throws(
    function () {
      assert({type: 'element', tagName: '', children: []});
    },
    /^AssertionError: `element.tagName` should not be empty: `{ type: 'element', tagName: '', children: \[\] }`$/,
    'should throw if a `element` has an empty `tagName`'
  );

  t.end();
});

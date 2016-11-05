'use strict';

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert(doctype)', function (t) {
  t.throws(
    function () {
      assert({type: 'doctype'});
    },
    /^AssertionError: `doctype` should have a `name`: `{ type: 'doctype' }`$/,
    'should throw if a `doctype` doesn’t have a name'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'doctype', name: 'html'});
    },
    'should allow names'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'doctype', name: ''});
    },
    'should allow empty names'
  );

  t.throws(
    function () {
      assert({type: 'doctype', name: 'html', public: true});
    },
    /^AssertionError: `doctype.public` should be `string`: `{ type: 'doctype', name: 'html', public: true }`$/,
    'should throw if a `public` isn’t string'
  );

  t.throws(
    function () {
      assert({type: 'doctype', name: 'html', system: false});
    },
    /^AssertionError: `doctype.system` should be `string`: `{ type: 'doctype', name: 'html', system: false }`$/,
    'should throw if a `system` isn’t string'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'doctype', name: 'html', public: 'a', system: 'b'});
    },
    'should allow string `public` and `system`'
  );

  t.end();
});

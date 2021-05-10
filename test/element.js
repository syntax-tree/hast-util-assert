import test from 'tape'
import {assert} from '../index.js'

test('assert(element)', function (t) {
  t.throws(
    function () {
      assert({type: 'element'})
    },
    /parent should have `children`: `{ type: 'element' }`$/,
    'should throw if a `element` is not a parent'
  )

  t.throws(
    function () {
      assert({type: 'element', children: []})
    },
    /`element` should have a `tagName`: `{ type: 'element', children: \[] }`$/,
    'should throw if a `element` has no `tagName`'
  )

  t.throws(
    function () {
      assert({type: 'element', tagName: '', children: []})
    },
    /`element.tagName` should not be empty: `{ type: 'element', tagName: '', children: \[] }`$/,
    'should throw if a `element` has an empty `tagName`'
  )

  t.end()
})

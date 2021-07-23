import test from 'tape'
import {assert} from '../index.js'

test('assert(element)', (t) => {
  t.throws(
    () => {
      assert({type: 'element'})
    },
    /parent should have `children`: `{ type: 'element' }`$/,
    'should throw if a `element` is not a parent'
  )

  t.throws(
    () => {
      assert({type: 'element', children: []})
    },
    /`element` should have a `tagName`: `{ type: 'element', children: \[] }`$/,
    'should throw if a `element` has no `tagName`'
  )

  t.throws(
    () => {
      assert({type: 'element', tagName: '', children: []})
    },
    /`element.tagName` should not be empty: `{ type: 'element', tagName: '', children: \[] }`$/,
    'should throw if a `element` has an empty `tagName`'
  )

  t.end()
})

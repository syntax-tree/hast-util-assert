import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(comment)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'comment'})
    },
    /literal should have `value`: `{ type: 'comment' }`$/,
    'should throw if a `comment` doesn’t have a value'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'comment', value: 'Alpha'})
  }, 'should allow `value`')
})

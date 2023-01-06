import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(text)', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'text'})
    },
    /literal should have `value`: `{ type: 'text' }`$/,
    'should throw if a `text` doesn’t have a value'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'text', value: 'Alpha'})
  }, 'should allow `value`')
})

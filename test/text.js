import test from 'tape'
import {assert} from '../index.js'

test('assert(text)', (t) => {
  t.throws(
    () => {
      assert({type: 'text'})
    },
    /literal should have `value`: `{ type: 'text' }`$/,
    'should throw if a `text` doesn’t have a value'
  )

  t.doesNotThrow(() => {
    assert({type: 'text', value: 'Alpha'})
  }, 'should allow `value`')

  t.end()
})

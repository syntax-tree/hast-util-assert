import test from 'tape'
import {assert} from '../index.js'

test('assert(comment)', (t) => {
  t.throws(
    () => {
      assert({type: 'comment'})
    },
    /literal should have `value`: `{ type: 'comment' }`$/,
    'should throw if a `comment` doesn’t have a value'
  )

  t.doesNotThrow(() => {
    assert({type: 'comment', value: 'Alpha'})
  }, 'should allow `value`')

  t.end()
})

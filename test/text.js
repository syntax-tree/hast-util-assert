import test from 'tape'
import {assert} from '../index.js'

test('assert(text)', function (t) {
  t.throws(
    function () {
      assert({type: 'text'})
    },
    /literal should have `value`: `{ type: 'text' }`$/,
    'should throw if a `text` doesn’t have a value'
  )

  t.doesNotThrow(function () {
    assert({type: 'text', value: 'Alpha'})
  }, 'should allow `value`')

  t.end()
})

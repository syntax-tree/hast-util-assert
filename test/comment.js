import test from 'tape'
import {assert} from '../index.js'

test('assert(comment)', function (t) {
  t.throws(
    function () {
      assert({type: 'comment'})
    },
    /literal should have `value`: `{ type: 'comment' }`$/,
    'should throw if a `comment` doesn’t have a value'
  )

  t.doesNotThrow(function () {
    assert({type: 'comment', value: 'Alpha'})
  }, 'should allow `value`')

  t.end()
})

import test from 'tape'
import {assert} from '../index.js'

test('assert(doctype)', function (t) {
  t.doesNotThrow(function () {
    assert({type: 'doctype'})
  }, 'should allow doctypes')

  t.end()
})

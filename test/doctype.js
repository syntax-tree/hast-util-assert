import test from 'tape'
import {assert} from '../index.js'

test('assert(doctype)', (t) => {
  t.doesNotThrow(() => {
    assert({type: 'doctype'})
  }, 'should allow doctypes')

  t.end()
})

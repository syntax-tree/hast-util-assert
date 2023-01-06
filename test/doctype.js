import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(doctype)', () => {
  nodeAssert.doesNotThrow(() => {
    assert({type: 'doctype'})
  }, 'should allow doctypes')
})

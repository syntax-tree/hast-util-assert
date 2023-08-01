import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(text)', async function (t) {
  await t.test(
    'should throw if a `text` doesn’t have a value',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'text'})
      }, /literal should have `value`: `{ type: 'text' }`$/)
    }
  )

  await t.test('should allow `value`', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({type: 'text', value: 'Alpha'})
    })
  })
})

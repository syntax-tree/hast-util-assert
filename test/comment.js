import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'hast-util-assert'

test('assert(comment)', async function (t) {
  await t.test(
    'should throw if a `comment` doesn’t have a value',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'comment'})
      }, /literal should have `value`: `{ type: 'comment' }`$/)
    }
  )

  await t.test('should allow `value`', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({type: 'comment', value: 'Alpha'})
    })
  })
})

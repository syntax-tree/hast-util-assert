import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'hast-util-assert'

test('assert(doctype)', async function (t) {
  await t.test('should allow doctypes', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({type: 'doctype'})
    })
  })
})

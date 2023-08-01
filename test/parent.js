import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {parent} from '../index.js'

test('parent', async function (t) {
  await t.test('should throw if not given a node', async function () {
    nodeAssert.throws(function () {
      parent()
    }, /node should be an object: `undefined`$/)
  })

  await t.test('should throw if not given a parent', async function () {
    nodeAssert.throws(function () {
      parent({type: 'x'})
    }, /parent should have `children`/)
  })
})

import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('assert(element)', async function (t) {
  await t.test(
    'should throw if a `element` is not a parent',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'element'})
      }, /parent should have `children`: `{ type: 'element' }`$/)
    }
  )

  await t.test(
    'should throw if a `element` has no `tagName`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'element', children: []})
      }, /`element` should have a `tagName`: `{ type: 'element', children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if a `element` has an empty `tagName`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'element', tagName: '', children: []})
      }, /`element.tagName` should not be empty: `{ type: 'element', tagName: '', children: \[] }`$/)
    }
  )
})

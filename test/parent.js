import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {parent} from '../index.js'

test('parent', () => {
  nodeAssert.throws(
    () => {
      parent()
    },
    /node should be an object: `undefined`$/,
    'should throw if not given a node'
  )

  nodeAssert.throws(
    () => {
      parent({type: 'x'})
    },
    /parent should have `children`/,
    'should throw if not given a parent'
  )
})

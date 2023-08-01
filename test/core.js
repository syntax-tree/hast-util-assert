import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import * as mod from '../index.js'

test('api', () => {
  nodeAssert.deepEqual(
    Object.keys(mod).sort(),
    ['_void', 'assert', 'literal', 'parent', 'wrap'],
    'should expose the public api'
  )
})
import nodeAssert from 'node:assert/strict'
import test from 'node:test'

test('api', async function (t) {
  await t.test('should expose the public api', async function () {
    nodeAssert.deepEqual(Object.keys(await import('hast-util-assert')).sort(), [
      '_void',
      'assert',
      'literal',
      'parent',
      'wrap'
    ])
  })
})

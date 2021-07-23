import test from 'tape'
import {parent} from '../index.js'

test('parent', (t) => {
  t.throws(
    () => {
      parent()
    },
    /node should be an object: `undefined`$/,
    'should throw if not given a node'
  )

  t.throws(
    () => {
      parent({type: 'x'})
    },
    /parent should have `children`/,
    'should throw if not given a parent'
  )

  t.end()
})

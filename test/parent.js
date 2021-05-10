import test from 'tape'
import {parent} from '../index.js'

test('parent', function (t) {
  t.throws(
    function () {
      parent()
    },
    /node should be an object: `undefined`$/,
    'should throw if not given a node'
  )

  t.throws(
    function () {
      parent({type: 'x'})
    },
    /parent should have `children`/,
    'should throw if not given a parent'
  )

  t.end()
})

/**
 * @typedef {import('hast').Node} Node
 * @typedef {import('hast').Parent} Parent
 * @typedef {import('hast').Literal} Literal
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').DocType} Doctype
 */

import nodeAssert from 'node:assert'
import {zwitch} from 'zwitch'
import {mapz} from 'mapz'
import {
  assert as unistAssert,
  parent as unistParent,
  literal as unistLiteral,
  wrap,
  _void
} from 'unist-util-assert'

/**
 * Assert that `node` is a valid hast node.
 * If `node` is a parent, all children will be asserted too.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Node}
 */
export function assert(node, parent) {
  return wrap(hast)(node, parent)
}

/**
 * Assert that `node` is a valid hast parent.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Parent}
 */
export function parent(node, parent) {
  return wrap(assertParent)(node, parent)
}

/**
 * Assert that `node` is a valid hast literal.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Literal}
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

const hast = zwitch('type', {
  // Core interface.
  // @ts-expect-error: hush.
  unknown,
  // @ts-expect-error: hush.
  invalid: unknown,

  // Per-type handling.
  handlers: {
    // @ts-expect-error: hush.
    root: wrap(assertRoot),
    // @ts-expect-error: hush.
    element: wrap(assertElement),
    // @ts-expect-error: hush.
    doctype: _void,
    // @ts-expect-error: hush.
    comment: literal,
    // @ts-expect-error: hush.
    text: literal
  }
})

const all = mapz(hast, {key: 'children'})

/**
 * @param {unknown} node
 * @param {Parent} [ancestor]
 * @returns {asserts node is Node}
 */
function unknown(node, ancestor) {
  unistAssert(node, ancestor)
}

/**
 * @param {unknown} node
 * @returns {asserts node is Parent}
 */
function assertParent(node) {
  unistParent(node)
  all(node)
}

/**
 * @param {unknown} node
 * @returns {asserts node is Literal}
 */
function assertLiteral(node) {
  unistLiteral(node)
  nodeAssert.strictEqual(
    typeof node.value,
    'string',
    'literal should have a string `value`'
  )
}

/**
 * @param {unknown} node
 * @param {Parent} [ancestor]
 * @returns {asserts node is Root}
 */
function assertRoot(node, ancestor) {
  assertParent(node)
  nodeAssert.strictEqual(ancestor, undefined, '`root` should not have a parent')
}

/**
 * @param {unknown} node
 * @returns {asserts node is Element}
 */
function assertElement(node) {
  assertParent(node)

  nodeAssert.strictEqual(
    // @ts-expect-error: hush.
    typeof node.tagName,
    'string',
    '`element` should have a `tagName`'
  )
  nodeAssert.notStrictEqual(
    // @ts-expect-error: hush.
    node.tagName,
    '',
    '`element.tagName` should not be empty'
  )
}

export {_void, wrap} from 'unist-util-assert'

/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('unist').Literal} UnistLiteral
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Element} Element
 */

/**
 * @typedef {Root | Content} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {Extract<Node, UnistLiteral>} Literal
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
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Node}
 */
export function assert(node, parent) {
  return wrap(hast)(node, parent)
}

/**
 * Assert that `node` is a valid hast parent.
 *
 * @param {unknown} [node]
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Parent}
 */
export function parent(node, parent) {
  return wrap(assertParent)(node, parent)
}

/**
 * Assert that `node` is a valid hast literal.
 *
 * @param {unknown} [node]
 * @param {UnistParent | null | undefined} [parent]
 * @returns {asserts node is Literal}
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

const hast = zwitch('type', {
  // Core interface.
  unknown,
  invalid: unknown,
  // Per-type handling.
  handlers: {
    root: wrap(assertRoot),
    element: wrap(assertElement),
    doctype: _void,
    comment: literal,
    text: literal
  }
})

const all = mapz(hast, {key: 'children'})

/**
 * @param {unknown} node
 * @param {UnistParent | null | undefined} [ancestor]
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
    // `value` in unist literals is `any`.
    // type-coverage:ignore-next-line
    typeof node.value,
    'string',
    'literal should have a string `value`'
  )
}

/**
 * @param {unknown} node
 * @param {UnistParent | null | undefined} [ancestor]
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

/**
 * @typedef {import('hast').Literals} Literals
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 * @typedef {import('hast').Root} Root
 *
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 *
 * @typedef {import('unist-util-assert').AssertionError} AssertionError
 */

import nodeAssert from 'node:assert'
import {mapz} from 'mapz'
import {
  _void,
  assert as unistAssert,
  literal as unistLiteral,
  parent as unistParent,
  wrap
} from 'unist-util-assert'
import {zwitch} from 'zwitch'

/**
 * Assert that `tree` is a valid hast node.
 *
 * If `tree` is a parent, all children will be asserted too.
 *
 * Supports unknown hast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Nodes}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` (or its descendants) is not a hast node.
 */
export function assert(tree, parent) {
  return wrap(hast)(tree, parent)
}

/**
 * Assert that `tree` is a valid hast parent.
 *
 * All children will be asserted too.
 *
 * Supports unknown hast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Parents}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a parent or its descendants are not nodes.
 */
export function parent(tree, parent) {
  return wrap(assertParent)(tree, parent)
}

/**
 * Assert that `node` is a valid hast literal.
 *
 * Supports unknown hast nodes.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is Literals}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a hast literal.
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
 * Assert that `node` (which is not a known hast node) is a valid unist node.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is UnistNode}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a unist node.
 */
function unknown(node, parent) {
  unistAssert(node, parent)
}

/**
 * Assert that `tree` is a valid hast parent, with valid children.
 *
 * All children will be asserted too.
 *
 * Supports unknown hast nodes.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Parents}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a parent or its descendants are not nodes.
 */
function assertParent(tree) {
  unistParent(tree)
  all(tree)
}

/**
 * Assert that `node` is a valid hast literal.
 *
 * Supports unknown hast nodes.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts node is Literals}
 *   Nothing.
 * @throws {AssertionError}
 *   When `node` is not a hast literal.
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
 * Assert that `tree` is a hast root with valid children.
 *
 * Supports unknown hast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {UnistParent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Root}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not a root or its descendants are not valid.
 */
function assertRoot(tree, parent) {
  assertParent(tree)
  nodeAssert.strictEqual(parent, undefined, '`root` should not have a parent')
}

/**
 * Assert that `tree` is a hast element with valid children.
 *
 * Supports unknown hast descendants.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @returns {asserts tree is Element}
 *   Nothing.
 * @throws {AssertionError}
 *   When `tree` is not an element or its descendants are not valid.
 */
function assertElement(tree) {
  assertParent(tree)

  nodeAssert.ok(
    'tagName' in tree && typeof tree.tagName === 'string',
    '`element` should have a `tagName`'
  )
  nodeAssert.ok(tree.tagName !== '', '`element.tagName` should not be empty')
}

export {_void, wrap} from 'unist-util-assert'

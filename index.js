'use strict'

var assert = require('assert')
var zwitch = require('zwitch')
var mapz = require('mapz')
var unist = require('unist-util-assert')

/* Construct. */
var hast = zwitch('type')

exports = unist.wrap(hast)
module.exports = exports

exports.parent = unist.wrap(parent)
exports.text = unist.text
exports.void = unist.void
exports.wrap = unist.wrap
exports.all = mapz(exports, {key: 'children', indices: false})

/* Core interface. */
hast.invalid = unknown
hast.unknown = unknown

/* Per-type handling. */
hast.handlers = {
  root: unist.wrap(root),
  element: unist.wrap(element),
  doctype: unist.wrap(doctype),
  comment: exports.text,
  text: exports.text
}

function unknown(node, ancestor) {
  unist(node, ancestor)
}

function parent(node) {
  unist.parent(node)
  exports.all(node)
}

function root(node, ancestor) {
  parent(node)

  assert.equal(ancestor, undefined, '`root` should not have a parent')
}

function element(node) {
  parent(node)

  assert.equal(
    typeof node.tagName,
    'string',
    '`element` should have a `tagName`'
  )
  assert.notEqual(node.tagName, '', '`element.tagName` should not be empty')
}

function doctype(node) {
  unist.void(node)

  assert.equal(typeof node.name, 'string', '`doctype` should have a `name`')

  if (node.public != null) {
    assert.equal(
      typeof node.public,
      'string',
      '`doctype.public` should be `string`'
    )
  }

  if (node.system != null) {
    assert.equal(
      typeof node.system,
      'string',
      '`doctype.system` should be `string`'
    )
  }
}

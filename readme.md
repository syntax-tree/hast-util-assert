# hast-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to assert trees.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`assert(tree[, parent])`](#asserttree-parent)
    *   [`parent(tree[, parent])`](#parenttree-parent)
    *   [`literal(node[, parent])`](#literalnode-parent)
    *   [`_void(node[, parent])`](#_voidnode-parent)
    *   [`wrap(fn)`](#wrapfn)
    *   [`AssertionError`](#assertionerror)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a tiny utility that helps you deal with nodes.

## When should I use this?

This utility is typically useful when you expect certain nodes in your APIs
and want to make sure they’re valid and as expected.

A different utility, [`unist-util-assert`][unist-util-assert], does the same but
for any [unist][] node.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install hast-util-assert
```

In Deno with [`esm.sh`][esmsh]:

```js
import {assert} from 'https://esm.sh/hast-util-assert@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {assert} from 'https://esm.sh/hast-util-assert@3?bundle'
</script>
```

## Use

```js
import {assert} from 'hast-util-assert'

assert({type: 'root', children: []})
assert({type: 'element', tagName: 'a', properties: {}, children: []})
// All OK.

assert({children: []})
// AssertionError: node should have a type: `{ children: [] }`

assert({type: 'element', properties: {}, children: []})
// AssertionError: `element` should have a `tagName`: `{ type: 'element', properties: {}, children: [] }`
```

## API

This package exports the identifiers [`_void`][api-void],
[`assert`][api-assert],
[`literal`][api-literal],
[`parent`][api-parent], and
[`wrap`][api-wrap].
There is no default export.

### `assert(tree[, parent])`

Assert that `tree` is a valid hast [`Node`][node].

If `tree` is a parent, all children will be asserted too.

Supports unknown hast nodes.

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `tree` (or its descendants) is not a hast node
([`AssertionError`][api-assertion-error]).

### `parent(tree[, parent])`

Assert that `tree` is a valid hast [`Parent`][parent-node].

All children will be asserted too.

Supports unknown hast nodes.

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `tree` is not a parent or its descendants are not nodes
([`AssertionError`][api-assertion-error])

### `literal(node[, parent])`

Assert that `node` is a valid hast [`Literal`][literal-node].

Supports unknown hast nodes.

###### Parameters

*   `node` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `node` is not a hast literal ([`AssertionError`][api-assertion-error]).

### `_void(node[, parent])`

Re-exported from [`unist-util-assert`][unist-util-assert-void].

### `wrap(fn)`

Re-exported from [`unist-util-assert`][unist-util-assert-wrap].

### `AssertionError`

Re-exported from [`unist-util-assert`][unist-util-assert-assertion-error].

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`AssertionError`][api-assertion-error].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `hast-util-assert@^3`,
compatible with Node.js 12.

## Security

`hast-util-assert` does not change the syntax tree so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`unist-util-assert`][unist-util-assert]
    — check [unist](https://github.com/syntax-tree/unist) nodes
*   [`mdast-util-assert`](https://github.com/syntax-tree/mdast-util-assert)
    — check [mdast](https://github.com/syntax-tree/mdast) nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — check [nlcst](https://github.com/syntax-tree/nlcst) nodes

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-assert/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-assert/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-assert.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-assert

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-assert.svg

[downloads]: https://www.npmjs.com/package/hast-util-assert

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=hast-util-assert

[size]: https://bundlejs.com/?q=hast-util-assert

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[unist-util-assert]: https://github.com/syntax-tree/unist-util-assert

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#nodes

[parent-node]: https://github.com/syntax-tree/unist#parent-1

[literal-node]: https://github.com/syntax-tree/unist#literal

[hast]: https://github.com/syntax-tree/hast

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[unist-util-assert-void]: https://github.com/syntax-tree/unist-util-assert#_voidnode-parent

[unist-util-assert-wrap]: https://github.com/syntax-tree/unist-util-assert#wrapfn

[unist-util-assert-assertion-error]: https://github.com/syntax-tree/unist-util-assert#assertionerror

[api-void]: #_voidnode-parent

[api-assert]: #asserttree-parent

[api-literal]: #literalnode-parent

[api-parent]: #parenttree-parent

[api-wrap]: #wrapfn

[api-assertion-error]: #assertionerror

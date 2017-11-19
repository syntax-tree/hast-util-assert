# hast-util-assert [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Assert [HAST][] nodes.

## Installation

[npm][]:

```bash
npm install hast-util-assert
```

## Usage

```javascript
var assert = require('hast-util-assert');

assert({type: 'root', children: []});
assert({type: 'element', tagName: 'a', properties: {}, children: []});
// All OK.

assert({children: []});
// AssertionError: node should have a type: `{ children: [] }`

assert({type: 'element', properties: {}, children: []});
// AssertionError: `element` should have a `tagName`: `{ type: 'element', properties: {}, children: [] }`
```

## API

### `assert(node)`

Assert that `node` is a valid [HAST][] node.  If `node` has `children`,
all children will be asserted as well.

The `assert.parent`, `assert.text`, `assert.void`, and `assert.wrap`
methods from [`unist-util-assert`][unist-util-assert] are also included.

## Contribute

See [`contribute.md` in `syntax-tree/hast`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/hast-util-assert.svg

[travis]: https://travis-ci.org/syntax-tree/hast-util-assert

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-assert.svg

[codecov]: https://codecov.io/github/syntax-tree/hast-util-assert

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[unist-util-assert]: https://github.com/syntax-tree/unist-util-assert

[contribute]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md

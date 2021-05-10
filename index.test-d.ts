import {expectType, expectNotType} from 'tsd'
import {Node, Parent} from 'hast'
import {assert, parent} from './index.js'

var emptyNode = {type: 'doctype'}
var literalNode = {type: 'text', value: 'a'}
var parentNode = {type: 'element', children: [emptyNode, literalNode]}

expectNotType<Node>(emptyNode)
expectNotType<Node>(literalNode)
expectNotType<Node>(parentNode)

assert(emptyNode)
expectType<Node>(emptyNode)

expectNotType<Parent>(parentNode)
parent(parentNode)
expectType<Parent>(parentNode)

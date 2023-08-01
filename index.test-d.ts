import type {Nodes, Parents} from 'hast'
import {expectNotType, expectType} from 'tsd'
import {assert, parent} from './index.js'

const emptyNode = {type: 'doctype'}
const literalNode = {type: 'text', value: 'a'}
const parentNode = {type: 'element', children: [emptyNode, literalNode]}

expectNotType<Nodes>(emptyNode)
expectNotType<Nodes>(literalNode)
expectNotType<Nodes>(parentNode)

assert(emptyNode)
expectType<Nodes>(emptyNode)

expectNotType<Parents>(parentNode)
parent(parentNode)
expectType<Parents>(parentNode)

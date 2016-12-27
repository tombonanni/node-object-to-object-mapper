'use strict';

const Wrapper = require('../utils/wrapper');

/**
 * Convert a value to string
 * @param {*} input - current value
 * @return {string} new string value
 *
 * @example
 * toStr(4) // => '4'
 * toStr(true) // => 'true'
 * toStr(Infinity) // => 'Infinity'
 * toStr(null) // => 'null'
 * toStr() // => 'undefined'
 * toStr(NaN) // 'NaN'
 * toStr(4.5) // => '4.5'
 * toStr([3, 4, 5]) // => '3,4,5'
 * toStr('Hello World!') // => 'Hello World!'
 * toStr({answer: 42}) // => '[object Object]'
 * toStr(function () {}) // => 'function () {}'
 */
function toStr(input) {
    return String(input);
}

/**
 * Convert a value to integer, with a radix
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {int} [radix] - radix to be applied on integer conversion (default: 10)
 * @return {int} new integer value
 *
 * @example
 * toInt(4) // => 4
 * toInt(true) // => NaN
 * toInt(Infinity) // => NaN
 * toInt(null) // => NaN
 * toInt() // => NaN
 * toInt(NaN) // NaN
 * toInt(4.5) // => 4
 * toInt([3.1, 4.2, 5.3]) // => 3
 * toInt('Hello World!') // => NaN
 * toInt({answer: 42}) // => NaN
 * toInt(function () {}) // => NaN
 */
function toInt(input, object, radix) {
    return parseInt(input, radix || 10);
}

/**
 * Convert a value to float
 * @param  {*} input - current value
 * @return {float} new float value
 *
 * @example
 * toFloat(4) // => 4
 * toFloat(true) // => NaN
 * toFloat(Infinity) // => Infinity
 * toFloat(null) // => NaN
 * toFloat() // => NaN
 * toFloat(NaN) // => NaN
 * toFloat(4.5) // => 4.5
 * toFloat([3.1, 4.2, 5.3]) // => 3.1
 * toFloat('Hello World!') // => NaN
 * toFloat({answer: 42}) // => NaN
 * toFloat(function () {}) // => NaN
 */
function toFloat(input) {
    return parseFloat(input);
}

/**
 * Convert a value to boolean
 * @param  {*} input - current value
 * @return {boolean} new boolean value
 *
 * @example
 * toBool(4) // => true
 * toBool(true) // => true
 * toBool(Infinity) // => true
 * toBool(null) // => false
 * toBool() // => false
 * toBool(NaN) // => false
 * toBool(4.5) // => true
 * toBool([3.1, 4.2, 5.3]) // => true
 * toBool('Hello World!') // => true
 * toBool({answer: 42}) // => true
 * toBool(function () {}) // => true
 * toBool(0) // => false
 * toBool(-1) // => true
 * toBool(0.0) // => false
 * toBool(-1.0) // => true
 */
function toBool(input) {
    return Boolean(input);
}

/**
 * Convert a value to an Array, if it is not already an Array
 * @param  {*} input - current value
 * @return {Array} new Array value
 *
 * @example
 * toArray(4) // => [4]
 * toArray(true) // => [true]
 * toArray(Infinity) // => [Infinity]
 * toArray(null) // => [null]
 * toArray() // => [undefined]
 * toArray(NaN) // => [NaN]
 * toArray(4.5) // => [4.5]
 * toArray([3.1, 4.2, 5.3]) // => [3.1, 4.2, 5.3]
 * toArray('Hello World!') // => ['Hello World!']
 * toArray({answer: 42}) // => [{answer: 42}]
 * toArray(function () {}) // => [function () {}]
 */
function toArray(input) {
    return Array.isArray(input) ? input : [input];
}

/**
 * Convert a value to an Object, by using JSON.parse
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @return {Object} new Object value
 *
 * @example
 * toObject(4) // => 4
 * toObject(true) // => true
 * toObject(4.5) // => 4.5
 * toObject('{"answer":42}') // => {answer: 42}
 */
function toObject(input, object) {
    return JSON.parse(input);
}

/**
 * Stringify a value using JSON.stringify
 * @param  {*} input - current value
 * @return {string} new string value
 *
 * @example
 * stringify(4) // => '4'
 * stringify(true) // => 'true'
 * stringify(Infinity) // => 'null'
 * stringify(null) // => 'null'
 * stringify() // =>
 * stringify(NaN) // => 'null'
 * stringify(4.5) // => '4.5'
 * stringify([3.1, 4.2, 5.3]) // => '[3.1,4.2,5.3]'
 * stringify('Hello World!') // => '"Hello World!"'
 * stringify({answer: 42}) // => '{"answer":42}'
 * stringify(function () {}) // =>
 */
function stringify(input) {
    return JSON.stringify(input);
}

module.exports = {
    toStr: Wrapper.valueHandler(toStr),
    toInt: Wrapper.valueHandler(toInt),
    toFloat: Wrapper.valueHandler(toFloat),
    toBool: Wrapper.valueHandler(toBool),
    toArray: Wrapper.valueHandler(toArray),
    toObject: Wrapper.valueHandler(toObject),
    stringify: Wrapper.valueHandler(stringify)
};

'use strict';

const _ = require('lodash');

const Wrapper = require('../utils/wrapper');

/**
 * Flatten an input Array
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {boolean} [flattenDeep] - whether to flatten recursively or not (default: false)
 * @return {Array} flattened Array
 *
 * @example
 * flatten(4) // => []
 * flatten(true) // => []
 * flatten(Infinity) // => []
 * flatten(null) // => []
 * flatten() // => []
 * flatten(NaN) // []
 * flatten(4.5) // => []
 * flatten([3, 4, 5]) // => [3, 4, 5]
 * flatten('hello') // => ['h', 'e', 'l', 'l', 'o']
 * flatten({answer: 42}) // => []
 * flatten(function () {}) // => []
 * flatten([[3], [[4], 5], [[[[[6]]]]]]) // => [3, [4], 5, [[[[6]]]]]
 * flatten([[3], [[4], 5], [[[[[6]]]]]], {}, true) // => [3, 4, 5, 6]
 */
function flatten(input, object, flattenDeep) {
    if (flattenDeep) {
        return _.flattenDeep(input);
    }
    return _.flatten(input);
}

/**
 * Retrive only unique values from an Array
 * @param  {*} input - current value
 * @return {Array} set of unique elements
 *
 * @example
 * unique(4) // => []
 * unique(true) // => []
 * unique(Infinity) // => []
 * unique(null) // => []
 * unique() // => []
 * unique(NaN) // []
 * unique(4.5) // => []
 * unique([3, 4, 5]) // => [3, 4, 5]
 * unique('hello') // => ['h', 'e', 'l', 'o']
 * unique({answer: 42}) // => []
 * unique(function () {}) // => []
 * unique([4, 3, 4, 2, [3]]) // => [4, 3, 2, [3]]
 */
function unique(input) {
    return _.uniq(input);
}

/**
 * Sum up elements in an Array
 * @param  {*} input - current value
 * @return {int|float} sum of elements in Array
 *
 * @example
 * sum(4) // => 0
 * sum(true) // => 0
 * sum(Infinity) // => 0
 * sum(null) // => 0
 * sum() // => 0
 * sum(NaN) // 0
 * sum(4.5) // => 0
 * sum([3, 4, 5]) // => 12
 * sum('hello') // => 'hello'
 * sum({answer: 42}) // => 0
 * sum(function () {}) // => 0
 */
function sum(input) {
    return _.sum(input);
}

/**
 * Retrieve the nth child from an Array
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {int} [index] - index to retrieve (default: 0)
 * @return {*} retrieved element
 *
 * @example
 * child(4) // =>
 * child(true) // =>
 * child(Infinity) // =>
 * child(null) // =>
 * child() // =>
 * child(NaN) // =>
 * child(4.5) // =>
 * child([3, 4, 5]) // => 3
 * child('hello') // => 'h'
 * child({answer: 42}) // =>
 * child(function () {}) // =>
 * child([4, 3, 4, 3], {}, 3) // => 3
 * child([4, 3, 4, 3], {}, 5) // =>
 * child([4, 3, 4, 3], {}, -2) // => 4
 */
function child(input, object, index) {
    return _.nth(input, index);
}

/**
 * Remove falsey values (ie. false, null, 0, "", undefined, NaN)
 * @param  {*} input - current value
 * @return {Array} Array without falsey values
 *
 * @example
 * compact(4) // => []
 * compact(true) // => []
 * compact(Infinity) // => []
 * compact(null) // => []
 * compact() // => []
 * compact(NaN) // => []
 * compact(4.5) // => []
 * compact([3, 4, 5]) // => [3, 4, 5]
 * compact('hello') // => ['h', 'e', 'l', 'l', 'o']
 * compact({answer: 42}) // => []
 * compact(function () {}) // => []
 * compact([false, 0, null, , '', NaN, 1]) // => [1]
 */
function compact(input) {
    return _.compact(input);
}

/**
 * Concatanate/append/push a new value onto input value to return an Array
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {*} [value] - value to concatenate/append/push
 * @return {Array} new Array with value concatanated, appended or pushed
 *
 * @example
 * concat(4) // => [4]
 * concat(true) // => [true]
 * concat(Infinity) // => [Infinity]
 * concat(null) // => [null]
 * concat() // => [undefined]
 * concat(NaN) // => [NaN]
 * concat(4.5) // => [4.5]
 * concat([3, 4, 5]) // => [3, 4, 5]
 * concat('hello') // => ['hello']
 * concat({answer: 42}) // => [{answer: 42}]
 * concat(function () {}) // => [function () {}]
 * concat([1], {}, 4) // => [1, 4]
 * concat(1, {}, 4) // => [1, 4]
 * concat('hello', {}, 4) // => ['hello', 4]
 * concat([1], {}, true) // => [1, true]
 * concat([1], {}, {answer: 42}) // => [1, {answer: 42}]
 */
function concat(input, object, value) {
    return value ? _.concat(input, value) : _.concat(input);
}

/**
 * Join an Array together given a joinToken
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {string} [joinToken] - a token to join values together
 * @return {string} joined value
 *
 * @example
 * join(4) // => ''
 * join(true) // => ''
 * join(Infinity) // => ''
 * join(null) // => ''
 * join() // => ''
 * join(NaN) // => ''
 * join(4.5) // => ''
 * join([3, 4, 5]) // => '345'
 * join('hello') // => 'hello'
 * join({answer: 42}) // => ''
 * join(function () {}) // => ''
 * join([1, 4, 5], {}, '-') // => '1-4-5'
 */
function join(input, object, joinToken) {
    return _.join(input, joinToken || '');
}

/**
 * Reverse the values in an Array
 * @param  {Array} input - current value
 * @return {Array} reversed Array
 *
 * @example
 * reverse([3, 4, 5]) // => [5, 4, 3]
 * reverse(['hello', 'world', '!']) // => ['!', 'world', 'hello']
 * reverse({answer: 42, me: 2}) // => {answer: 42, me: 2}
 */
function reverse(input) {
    return _.reverse(input);
}

/**
 * Slice values from an Array
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {int} [start] - starting point for slicing (default: 0)
 * @param  {int} [end] - endpoing for slicing
 * @return {Array} sliced Array
 *
 * @example
 * slice(4) // => []
 * slice(true) // => []
 * slice(Infinity) // => []
 * slice(null) // => []
 * slice() // => []
 * slice(NaN) // => []
 * slice(4.5) // => []
 * slice([3, 4, 5]) // => [3, 4, 5]
 * slice('hello') // => ['h', 'e', 'l', 'l', 'o']
 * slice({answer: 42}) // => []
 * slice(function () {}) // => []
 * slice([1, 4, 5], {}, 1, 1) // => []
 * slice([1, 4, 5], {}, 1, 2) // => [4]
 * slice([1, 4, 5], {}, 0, -1) // => [1, 4]
 */
function slice(input, object, start, end) {
    return _.slice(input, start, end);
}

/**
 * Get the length of an Array or string else return 0
 * @param  {*} input - current value
 * @return {int} length of the input Array or 0
 *
 * @example
 * length(4) // => 0
 * length(true) // => 0
 * length(Infinity) // => 0
 * length(null) // => 0
 * length() // => 0
 * length(NaN) // => 0
 * length(4.5) // => 0
 * length([3, 4, 5]) // => 3
 * length('hello') // => 5
 * length({answer: 42}) // => 0
 * length(function () {}) // => 0
 */
function length(input) {
    return Array.isArray(input) || typeof input === 'string' ? input.length : 0;
}

/**
 * Find a match in an Array of Objects
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {*} match - match to look for
 * @return {Object} matched element
 *
 * @example
 * find([{a: 3}, {a: 4}, {b: 5}], {}, 'a') // => {a: 3}
 * find([{a: 3}, {a: 4}, {b: 5}], {}, {b: 5}) // => {b: 5}
 * find([{a: 3}, {a: 4}, {b: 5}], {}, {b: 2}) // =>
 */
function find(input, object, match) {
    return _.find(input, match);
}

/**
 * Find all matches in an Array of Objects
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {*} match - match to look for
 * @return {Array} matched elements
 *
 * @example
 * findWhere([{a: 3}, {a: 4}, {b: 5}], {}, 'a') // => [{a: 3}, {a: 4}]
 * findWhere([{a: 3}, {a: 4}, {b: 5}], {}, {a: 3}) // => [{a: 3}]
 * findWhere([{a: 3}, {a: 4}, {b: 5}], {}, {a: 1}) // => []
 */
function findWhere(input, object, match) {
    return _.filter(input, match);
}

/**
 * Loop through all the elements of an Array
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {Function} func - function to execute on each element
 * @return {Array} Array with each element executed with input function
 *
 * @example
 * map([3, 4, 5], {}, function (a) { return a + 2; }) // => [5, 6, 7]
 * map('hello', {}, function (a) { return a + '^'; }) // => ['h^', 'e^', 'l^', 'l^', 'o^']
 */
function map(input, object, func) {
    return _.map(input, func);
}

/**
 * Loop through elements of an Array and filter out values
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {Function} func - function to execute on each element
 * @return {Array} Array with elements filtered out
 *
 * @example
 * filter([3, -4, -5], {}, function (a) { return a > 0; }) // => [3]
 * filter('hello', {}, function (a) { return a === 'l'; }) // => ['l', 'l']
 */
function filter(input, object, func) {
    return _.filter(input, func);
}

/**
 * Loop through elements of an Array and reduce to a single value
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {Function} func - function to execute on each element
 * @param  {*} initial - initial value into reducer
 * @return {*} reduced value
 *
 * @example
 * reduce([3, 4, 5], {}, function (p, v) { return p + v; }, 0) // => 12
 * reduce([3, 4, 5], {}, function (p, v) { return p + v; }, 10) // => 22
 * reduce('hello', {}, function (p, v) { return p + v; }, 'world ') // => 'world hello'
 */
function reduce(input, object, func, initial) {
    return _.reduce(input, func, initial);
}

/**
 * Loop through elements to sort them
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {Function} func - function to execute on each element
 * @return {Array} sorted Array
 *
 * @example
 * sort(4) // => 4
 * sort(true) // => true
 * sort(Infinity) // => Infinity
 * sort(null) // =>
 * sort() // =>
 * sort(NaN) // => NaN
 * sort(4.5) // => 4.5
 * sort('hello') // => 'hello'
 * sort([300, 4, 15]) // => [15, 300, 4]
 * sort([300, 4, 15], {}, function (a, b) { return a - b; }) // => [4, 15, 300]
 * sort([300, 4, 15], {}, function (a, b) { return b - a; }) // => [300, 15, 4]
 * sort([300, 4, 15], {}, function (a, b) { return b - a; }) // => [300, 15, 4]
 * sort(['h', 'e', 'l', 'l', 'o']) // => ['e', 'h', 'l', 'l', 'o']
 */
function sort(input, object, func) {
    return Array.isArray(input) ? input.sort(func) : input;
}

module.exports = {
    flatten: Wrapper.valueHandler(flatten),
    unique: Wrapper.valueHandler(unique),
    sum: Wrapper.valueHandler(sum),
    child: Wrapper.valueHandler(child),
    compact: Wrapper.valueHandler(compact),
    concat: Wrapper.valueHandler(concat),
    join: Wrapper.valueHandler(join),
    reverse: Wrapper.valueHandler(reverse),
    slice: Wrapper.valueHandler(slice),
    length: Wrapper.valueHandler(length),
    find: Wrapper.valueHandler(find),
    findWhere: Wrapper.valueHandler(findWhere),
    map: Wrapper.valueHandler(map),
    filter: Wrapper.valueHandler(filter),
    reduce: Wrapper.valueHandler(reduce),
    sort: Wrapper.valueHandler(sort)
};

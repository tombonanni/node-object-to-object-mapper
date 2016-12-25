'use strict';

const _ = require('lodash');

/**
 * Retrieve a value from the mapping object
 * @param  {*} input - current value
 * @param  {Object} object - input object into mapper
 * @param  {string} path - flattened path to retrieve
 * @param  {*} [defaultValue] - value to default to if path not found
 * @return {*} retrieved value
 *
 * @example
 * get(null, {a: {b: {c: {d: [0, 2]}}}}, 'a.b.c.d.1') // => 2
 * get(null, {a: {b: {c: {d: [0, 2]}}}}, 'a.b.c.d.e.3') // =>
 * get(null, {a: {b: {c: {d: [0, 2]}}}}, 'a.b.c.d.e.3', 42) // => 42
 */
function get(input, object, path, defaultValue) {
    return _.get(object, path, defaultValue);
}

/**
 * Set a new value
 * @param {*} input - current value
 * @param {Object} object - input object into mapper
 * @param {*} setValue - new value
 * @return {*} same as setValue
 *
 * @example
 * set(null, {}, 42) // => 42
 * set() // =>
 */
function set(input, object, setValue) {
    return setValue;
}

module.exports = {
    get: get,
    set: set
};

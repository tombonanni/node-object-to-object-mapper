'use strict';

const _ = require('lodash');

module.exports.convert = function (object, input) {
    return Array.isArray(input) ? input : [input];
};

module.exports.append = function (object, input, additional_input) {
    const value = _.get(object, additional_input, null);
    return _.isArray(input) ? input.concat([value]) : [].concat([value]);
};

module.exports.flatten = function (object, input) {
    return _.flatten(input);
};

module.exports.unique = function (object, input) {
    return _.uniq(input);
};

'use strict';

const _ = require('lodash');

module.exports.get = function (object, input) {
    return _.get(object, input);
};

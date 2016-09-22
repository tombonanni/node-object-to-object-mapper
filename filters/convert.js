'use strict';

module.exports.toArray = function (object, input) {
    return Array.isArray(input) ? input : [input];
};

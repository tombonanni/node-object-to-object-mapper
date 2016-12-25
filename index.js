'use strict';

const filters = require('./filters');

module.exports = function (object, customFilters) {
    return {
        defineMapping: function (func) {
            return func(filters.get(object, customFilters || {}));
        }
    };
};

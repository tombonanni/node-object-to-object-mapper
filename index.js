'use strict';

const _ = require('lodash');

const DEFAULT_FILTERS = require('./filters');
const Mapping = require('./lib/mapping');

module.exports = function (object, mapping, custom_filters) {
    const filter_collection = _.merge(_.cloneDeep(custom_filters), DEFAULT_FILTERS);
    return Mapping.apply(object, mapping, filter_collection);
};

'use strict';

const _ = require('lodash');

const DEFAULT_FILTERS = require('./filters');
const Mapping = require('./lib/mapping');

module.exports.map = function (object, mapping, custom_filters) {
    const filter_collection = _.merge(_.cloneDeep(DEFAULT_FILTERS), custom_filters || {});
    return Mapping.run(object, mapping, filter_collection, {});
};

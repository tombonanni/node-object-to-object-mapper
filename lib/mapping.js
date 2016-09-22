'use strict';

const _ = require('lodash');

const Method = require('./method');

module.exports.handleString = function (object, mapping, filter_collection, result) {
    const p = mapping.split(/:/);

    const filter = _.get(filter_collection, p[0]);
    if (_.isFunction(filter)) {
        const args = [object, result].concat(p.slice(1));
        return Method.call(filter, p[0], args);
    }
    return _.get(object, p[0]);
};

module.exports.handleArray = function (object, mapping, filter_collection) {
    const length = mapping.length;
    if (!length) {
        return [];
    }

    let result;
    for (let i = 0; i < length; i++) {
        result = module.exports.run(object, mapping[i], filter_collection, result);
    }

    return result;
};

module.exports.handleObject = function (object, mapping, filter_collection, result) {
    for (const key of Object.keys(mapping)) {
        const value = mapping[key];
        result[key] = module.exports.run(object, value, filter_collection, {});
    }
    return result;
};

module.exports.run = function (object, mapping, filter_collection, result) {
    if (_.isString(mapping)) {
        return module.exports.handleString(object, mapping, filter_collection, result || '');
    } else if (_.isArray(mapping)) {
        return module.exports.handleArray(object, mapping, filter_collection, result || []);
    } else if (_.isObject(mapping)) {
        return module.exports.handleObject(object, mapping, filter_collection, result || {});
    }
};

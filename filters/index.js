'use strict';

const Wrapper = require('../utils/wrapper');

function wrapFuncs(ctx, funcKeys, funcs, index) {
    if (index >= funcKeys.length) {
        return funcs;
    }

    const currentKey = funcKeys[index];
    const func = funcs[currentKey];
    const newFuncs = funcs;
    newFuncs[currentKey] = Wrapper.valueHandler(func).bind(ctx);
    return wrapFuncs(ctx, funcKeys, newFuncs, index + 1);
}

function wrapFilters(ctx, funcs) {
    return wrapFuncs(ctx, Object.keys(funcs), funcs, 0);
}

function getDefaultContext(object) {
    return {
        value: null,
        __object__: object,
        __error__: null,
        __path__: ''
    };
}

module.exports.get = function (object, customFilters) {
    return Object.assign(
        getDefaultContext(object),
        require('./array'),
        require('./convert'),
        require('./value'),
        wrapFilters({}, customFilters)
    );
};

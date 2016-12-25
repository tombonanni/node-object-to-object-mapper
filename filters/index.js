'use strict';

function wrapFunc(func) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        try {
            this.value = func.apply(null, [
                this.value,
                this.__object__
            ].concat(args));
        } catch (error) {
            this.__error__ = this.__error__ || error;
        }
        return this;
    };
}

function wrapFuncs(ctx, funcKeys, funcs, index) {
    if (index >= funcKeys.length) {
        return funcs;
    }

    const currentKey = funcKeys[index];
    const func = funcs[currentKey];
    const newFuncs = funcs;
    newFuncs[currentKey] = wrapFunc(func).bind(ctx);
    return wrapFuncs(ctx, funcKeys, newFuncs, index + 1);
}

function wrapFilters(ctx, funcs) {
    return wrapFuncs(ctx, Object.keys(funcs), funcs, 0);
}

module.exports.get = function (object, customFilters) {
    const ctx = {
        value: null,
        __object__: object,
        __error__: null
    };
    Object.assign(
        ctx,
        wrapFilters(ctx, require('./array')),
        wrapFilters(ctx, require('./convert')),
        wrapFilters(ctx, require('./value')),
        wrapFilters(ctx, customFilters)
    );
    return ctx;
};

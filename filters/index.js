'use strict';

function wrapFilter(ctx, funcs) {
    const keys = Object.keys(funcs);
    const wrappedFuncs = {};
    for (const key of keys) {
        const func = funcs[key];
        wrappedFuncs[key] = function () {
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
        }.bind(ctx);
    }
    return wrappedFuncs;
}

module.exports.get = function (object, customFilters) {
    const ctx = {
        value: null,
        __object__: object,
        __error__: null
    };
    Object.assign(
        ctx,
        wrapFilter(ctx, require('./array')),
        wrapFilter(ctx, require('./convert')),
        wrapFilter(ctx, require('./value')),
        wrapFilter(ctx, customFilters)
    );
    return ctx;
};

'use strict';

module.exports.valueHandler = function (func) {
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
};

module.exports.errorHandler = function (func) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        func.apply(null, [
            this.__error__,
            this.__object__,
            this.__path__
        ].concat(args));
        return this;
    };
};

module.exports.pathHandler = function (func) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        try {
            this.value = func.apply(null, [
                this.value,
                this.__object__
            ].concat(args));
            this.__path__ = args[0] && typeof args[0] === 'string' ? args[0] : this.__path__;
        } catch (error) {
            this.__error__ = this.__error__ || error;
        }
        return this;
    };
};

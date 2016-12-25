'use strict';

module.exports.getInput = function () {
    return {
        a: 5,
        b: {
            c: 3,
            d: [2, 1, 3]
        }
    };
};


module.exports.getOutput = function () {
    return {
        A: [5],
        B: [3, 2, 1]
    };
};

module.exports.getMapping = function (f) {
    return {
        A: f.get('a').toArray().value,
        B: f.set([
            f.get('b.c').value,
            f.get('b.d').value
        ]).flatten().unique().value
    };
};

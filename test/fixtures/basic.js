'use strict';

module.exports.getInput = function () {
    return {
        a: '5.2',
        b: {
            c: 3,
            d: [2, 1, 3]
        }
    };
};

module.exports.getOutput = function () {
    return {
        A: ['5'],
        B: [3, 2, 1],
        C: true,
        D: 3,
        E: {
            answer: 5.2
        }
    };
};

module.exports.getMapping = function (f) {
    return {
        A: f.get('a').toInt(10).toStr().toArray().value,
        B: f.set([
            f.get('b.c').value,
            f.get('b.d').value
        ]).flatten().unique().value,
        C: f.get('b.d').sum().toBool().value,
        D: f.get('b.d').flatten(true).child(2).value,
        E: f.set({
            answer: f.get('a').toFloat().value
        }).stringify().toObject().value
    };
};

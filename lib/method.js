'use strict';

module.exports.call = function (filter, filter_name, args) {
    // console.log('Calling ' + filter_name + '()');
    // console.log('With arguments: ' + args);
    const result = filter.apply(null, args);
    // console.log('Received result: ' + result);
    return result;
};

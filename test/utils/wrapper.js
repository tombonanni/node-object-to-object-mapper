/* eslint max-params: off */
'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const Wrapper = require('../../utils/wrapper');

function getInstanceVariables(obj) {
    return {
        value: _.get(obj, 'value', 5),
        __object__: _.get(obj, '__object__', 10),
        __error__: _.get(obj, '__error__', null),
        __path__: _.get(obj, '__path__', 'data.structure.value')
    };
}

describe('Testing Wrapper.valueHandler', function () {
    it('CASE 1: Handles values correctly', function () {
        const instanceVariables = getInstanceVariables();
        const exec = function (input, object) {
            return input + object;
        };

        const expectedResult = instanceVariables.value + instanceVariables.__object__;
        const output = Wrapper.valueHandler(exec).call(instanceVariables);

        expect(output).to.deep.eql({
            value: expectedResult,
            __object__: instanceVariables.__object__,
            __error__: instanceVariables.__error__,
            __path__: instanceVariables.__path__
        });
    });

    it('CASE 2: Handles errors correctly', function () {
        const errorMessage = 'DillyDongDillyDee';
        const instanceVariables = getInstanceVariables();
        const exec = function () {
            throw new Error(errorMessage);
        };

        const expectedResult = new Error(errorMessage);
        const output = Wrapper.valueHandler(exec).call(instanceVariables);

        expect(JSON.stringify(output)).to.be.eql(JSON.stringify({
            value: instanceVariables.value,
            __object__: instanceVariables.__object__,
            __error__: expectedResult,
            __path__: instanceVariables.__path__
        }));
    });

    it('CASE 3: Handles arguments correctly', function () {
        const instanceVariables = getInstanceVariables();
        const exec = function (input, object, arg1, arg2, arg3, arg4, arg5, arg6) {
            return input + object + arg1 + arg2 + arg3 + arg5 + arg6;
        };

        const args = [3, 2, -1, 10, 2, 6];
        const expectedResult = instanceVariables.value + instanceVariables.__object__ +
            args[0] + args[1] + args[2] + args[4] + args[5];

        const output = Wrapper.valueHandler(exec).call(
            instanceVariables, args[0], args[1], args[2], args[3], args[4], args[5]
        );

        expect(output).to.deep.eql({
            value: expectedResult,
            __object__: instanceVariables.__object__,
            __error__: instanceVariables.__error__,
            __path__: instanceVariables.__path__
        });
    });
});

describe('Testing Wrapper.errorHandler', function () {
    before(function () {
        this.exec = function (error, object, path) {
            if (error instanceof Error) {
                throw new Error(`${path}: ${error.message}`);
            }
        };

        this.run = function (exec, instanceVariables, args) {
            try {
                return Wrapper.errorHandler(exec).apply(instanceVariables, args);
            } catch (error) {
                return error;
            }
        };
    });

    it('CASE 1: Handles error correctly', function () {
        const errorMessage = 'DillyDongDillyDee';
        const instanceVariables = getInstanceVariables({
            __error__: new Error(errorMessage)
        });

        const expectedResult = new Error(`${instanceVariables.__path__}: ${errorMessage}`);
        const output = this.run(this.exec, instanceVariables);

        expect(output.message).to.eql(expectedResult.message);
    });

    it('CASE 2: Handles when no error is thrown', function () {
        const instanceVariables = getInstanceVariables();

        const expectedResult = Object.assign({}, instanceVariables);
        const output = this.run(this.exec, instanceVariables);

        expect(output).to.deep.eql(expectedResult);
    });

    it('CASE 3: Handles arguments correctly', function () {
        const errorMessage = 'DillyDongDillyDee';
        const instanceVariables = getInstanceVariables({
            __error__: new Error(errorMessage)
        });
        const exec = function (error, object, path, arg1, arg2, arg3, arg4, arg5) {
            throw new Error(`${path}: ${error.message} - ${[arg1, arg2, arg3, arg4, arg5].join('#')}`);
        };

        const args = [3, 2, -1, 10, 2];
        const expectedResult = new Error(
            `${instanceVariables.__path__}: ${errorMessage} - ${args.join('#')}`
        );
        const output = this.run(exec, instanceVariables, args);

        expect(output.message).to.eql(expectedResult.message);
    });
});

describe('Testing Wrapper.pathHandler', function () {
    it('CASE 1: Handles values correctly', function () {
        const path = 'data.separate.path';
        const instanceVariables = getInstanceVariables();
        const exec = function (input, object, p) {
            return input + object;
        };

        const expectedResult = instanceVariables.value + instanceVariables.__object__;
        const output = Wrapper.pathHandler(exec).call(instanceVariables, path);

        expect(output).to.deep.eql({
            value: expectedResult,
            __object__: instanceVariables.__object__,
            __error__: instanceVariables.__error__,
            __path__: path
        });
    });

    it('CASE 2: Handles errors correctly', function () {
        const errorMessage = 'DillyDongDillyDee';
        const instanceVariables = getInstanceVariables();
        const exec = function () {
            throw new Error(errorMessage);
        };

        const expectedResult = new Error(errorMessage);
        const output = Wrapper.pathHandler(exec).call(instanceVariables);

        expect(JSON.stringify(output)).to.be.eql(JSON.stringify({
            value: instanceVariables.value,
            __object__: instanceVariables.__object__,
            __error__: expectedResult,
            __path__: instanceVariables.__path__
        }));
    });

    it('CASE 3: Handles arguments correctly', function () {
        const instanceVariables = getInstanceVariables();
        const exec = function (input, object, arg1, arg2, arg3, arg4, arg5, arg6) {
            return input + object + arg1 + arg2 + arg3 + arg5 + arg6;
        };

        const args = [3, 2, -1, 10, 2, 6];
        const expectedResult = instanceVariables.value + instanceVariables.__object__ +
            args[0] + args[1] + args[2] + args[4] + args[5];

        const output = Wrapper.pathHandler(exec).call(
            instanceVariables, args[0], args[1], args[2], args[3], args[4], args[5]
        );

        expect(output).to.deep.eql({
            value: expectedResult,
            __object__: instanceVariables.__object__,
            __error__: instanceVariables.__error__,
            __path__: instanceVariables.__path__
        });
    });
});

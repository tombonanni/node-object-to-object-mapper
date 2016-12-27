'use strict';

const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');

const filters = rewire('../../filters');

describe('Unit testing filters/index.js', function () {
    it('CASE 1: Testing getDefaultContext', function () {
        const object = {
            a: 5
        };
        const expectedResult = {
            value: null,
            __object__: object,
            __error__: null,
            __path__: ''
        };

        expect(filters.__get__('getDefaultContext')(object)).to.deep.eql(expectedResult);
    });

    it('CASE 2: Testing wrapFilters', function () {
        const ctx = {
            a: 5
        };
        const funcs = {
            a: function () {},
            b: function () {},
            c: function () {}
        };

        const expectedResult = 42;
        const stub = sinon
            .stub()
            .withArgs(ctx, Object.keys(funcs), funcs, 0)
            .returns(expectedResult);
        const revert = filters.__set__('wrapFuncs', stub);

        expect(filters.__get__('wrapFilters')(ctx, funcs)).to.eql(expectedResult);
        revert();
    });

    it('CASE 3: Testing wrapFuncs', function () {
        function getCtx(value) {
            return {
                a: 5,
                b: 10,
                c: 12,
                value: value || 0
            };
        }
        const funcs = {
            a: function () {
                return this.a;
            },
            b: function () {
                return this.b;
            },
            c: function () {
                return this.c;
            }
        };

        const revert = filters.__set__('Wrapper.valueHandler', function (func) {
            return function () {
                this.value += func.call(this);
                return this;
            };
        });

        const output = filters.__get__('wrapFuncs')(
            getCtx(), Object.keys(funcs), funcs, 0
        );

        const ctx = getCtx();
        const v = ctx.value;
        expect(output.a()).to.deep.eql(getCtx(v + ctx.a));
        expect(output.b()).to.deep.eql(getCtx(v + ctx.a + ctx.b));
        expect(output.c()).to.deep.eql(getCtx(v + ctx.a + ctx.b + ctx.c));

        revert();
    });
});

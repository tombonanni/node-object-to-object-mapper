'use strict';

const _ = require('lodash');
const path = require('path');
const expect = require('chai').expect;
const Require = require('load-directory');

const ObjectCompose = require('../index');
const Fixtures = Require.all(path.join(__dirname, '/fixtures'), {
    map: Require.Strategies.Filename.snakeCase
});

describe('Integration testing object-to-object-mapper', function () {
    const length = Object.keys(Fixtures).length;
    for (let i = 0; i < length; i++) {
        const index = i + 1;
        const key = Object.keys(Fixtures)[i];
        const value = Fixtures[key];
        it('Case ' + index + ': Testing ' + key + ' mapping', function () {
            const result = ObjectCompose.map(value.input, value.mapping);

            expect(result).to.deep.eql(value.output);
        });
    }
});

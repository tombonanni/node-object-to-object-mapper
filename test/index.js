'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const Mapper = require('../index');

function getFixturesPath(filename) {
    const dir = 'fixtures';
    if (filename) {
        return path.join(__dirname, dir, filename);
    }
    return path.join(__dirname, dir);
}

describe('Integration testing object-to-object-mapper', function () {
    const filenames = fs.readdirSync(getFixturesPath()).filter(function (filename) {
        return filename.endsWith('.js');
    });

    filenames.map(function (filename, index) {
        it(`CASE ${index + 1}: Testing ${filename}`, function () {
            const test = require(getFixturesPath(filename));
            const output = Mapper(test.getInput()).defineMapping(test.getMapping);

            expect(output).to.deep.eql(test.getOutput());
        });
    });
});

'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised')).should();
const testFunction = require('../src/implement');

describe('UT ', () => {
    describe('#Test Function', () => {
        it('should return Hello World ', () => {
            expect(testFunction()).to.eq('Hello World!');
        });
    });
});
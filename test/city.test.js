const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../city');
require('chai').should();

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
    describe('City', () => {
        let g;
        before(() => {
            g = new City('test', 'test');
        });

        after(() => {
            g.endWorld();
        });

        it("should update city's corn ", async () => {
            g.corn.should.be.equal(1000);

            await g.getShit(1000);
            g.corn.should.be.equal(2000);

            await g.giveShit(2000);
            g.corn.should.be.equal(0);

        });

        it("should update divinity's gold", async () => {

            g.gold.should.be.equal(1000);

            await g.getShit(1000);
            g.gold.should.be.equal(2000);

            await  g.giveShit(2000);
            g.gold.should.be.equal(0);
        });
    });
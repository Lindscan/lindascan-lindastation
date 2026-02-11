const {assert, assertThrow, lindaStationBuilder, net, } = require('../../helpers/includes')
const LindaWeb = require('@lindacoin/lindaweb');


describe('#apis functional unit test', function () {

    let lindaStation;

    before(async function () {
        this.timeout(10000);
        lindaStation = lindaStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#from lind', function () {
        this.timeout(10000);

        it('should convert lind to sun', async function () {
            const res = await lindaStation.apis.fromLind(1);
            assert.equal(res, 10e5);
        });

    });

    describe('#getResourceByName', function () {
        this.timeout(10000);

        it('should get resource value by name', async function () {
            const res = await lindaStation.apis.getResourceByName('EnergyWeight');
            assert.isTrue(typeof res === 'number' && res >= 0);
        });

    });

    describe('#getResourcesByName', function () {
        this.timeout(10000);

        it('should get resources by names', async function () {
            const res = await lindaStation.apis.getResourcesByName(['TotalNetLimit', 'TotalNetWeight']);
            assert.isTrue(!!res.TotalNetLimit && !!res.TotalNetWeight);
        });

    });

    describe('#getChainParameterByName', function () {
        this.timeout(10000);

        it('should get proposal value by name', async function () {
            const res = await lindaStation.apis.getChainParameterByName('getEnergyFee');
            assert.equal(res, 10);
        });

    });

    describe('#getChainParametersByName', function () {
        this.timeout(10000);

        it('should get proposals by names', async function () {
            const res = await lindaStation.apis.getChainParametersByName(['getTotalEnergyLimit', 'getEnergyFee']);
            assert.isTrue(!!res.getTotalEnergyLimit && !!res.getEnergyFee);
        });

    });

})

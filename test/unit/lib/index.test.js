const {assert, assertThrow, lindaStationBuilder, net, } = require('../../helpers/includes')
const LindaWeb = require('lindaweb');


describe('#index functional unit test', function () {

    let lindaStation;

    before(async function () {
        this.timeout(10000);
        lindaStation = lindaStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#Reset lindaweb', function () {
        this.timeout(10000);

        it('should reset lindaWeb', async function () {
            let res = await lindaStation.witness.getSrVoteRewardList();
            assert.equal(res.rewardList.length, 1);
            const newLindaWeb = new LindaWeb({
                fullHost: 'https://api.lindagrid.lindacoin.org',
                privateKey: 'your private key'
            });
            lindaStation.setLindaWeb(newLindaWeb)
            res = await lindaStation.witness.getSrVoteRewardList()
            assert.isTrue(res.rewardList.length >= 27);
        });

    });

})

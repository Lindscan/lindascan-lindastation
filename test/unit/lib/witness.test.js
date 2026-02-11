const {assert, assertThrow, lindaStationBuilder, net} = require('../../helpers/includes')


describe('#witness functional unit test', function () {

    let lindaStation;

    before(async function () {
        this.timeout(10000);
        lindaStation = lindaStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#witness get srs reward list', function () {
        this.timeout(10000);

        it('should get srs reward list', async function () {
            const res = await lindaStation.witness.getSrVoteRewardList();
            assert.isTrue(res.totalVotes >= 0);
            assert.isTrue(res.rewardList.length >= 0);
        });

    });

    describe('#calculate new/old sr reward', function () {
        this.timeout(10000);

        it('should calculate existed sr reward', async function () {
            //zion sr
            const res = await lindaStation.witness.calculateSrReward(1000, '41928c9af0651632157ef27a2cf17ca72c575a4d21');
            assert.isTrue(res.rank === 1);
        });

        it('should calculate new sr reward', async function () {
            const res = await lindaStation.witness.calculateSrReward(1000);
            assert.equal(res.sr, 'New SR');
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                lindaStation.witness.calculateSrReward(-10000),
                'Provided addedVotes should be >= 0.'
            );

            await assertThrow(
                lindaStation.witness.calculateSrReward(10000, '1231232123213'),
                'Invalid address provided.'
            );
        });
    });

})

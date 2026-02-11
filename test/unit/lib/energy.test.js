const {assert, assertThrow, lindaStationBuilder, net} = require('../../helpers/includes')


describe('#energy functional unit test', function () {

    let lindaStation;

    before(async function () {
        this.timeout(10000);
        lindaStation = lindaStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#calculate frozen energy by amount', function () {
        this.timeout(10000);

        it('should get energy by amount with unit lind', async function () {
            const res = await lindaStation.energy.lind2FrozenEnergy(1);
            assert.isTrue(res >= 0)
        });

        it('should get energy by amount with unit sun', async function () {
            const res = await lindaStation.energy.lind2FrozenEnergy(10e5, { unit: 'sun' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                lindaStation.energy.lind2FrozenEnergy(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                lindaStation.energy.lind2FrozenEnergy(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate lind amount by frozen energy', function () {
        this.timeout(10000);

        it('should get lind by frozen energy with unit lind', async function () {
            const res = await lindaStation.energy.frozenEnergy2Lind(666.74484);
            assert.isTrue(res >= 0)
        });

        it('should get lind by frozen energy with unit sun', async function () {
            const res = await lindaStation.energy.frozenEnergy2Lind(666.74484, { unit: 'sun' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid energy error', async function () {
            await assertThrow(
                lindaStation.energy.frozenEnergy2Lind(''),
                'Invalid energy provided.'
            );

            await assertThrow(
                lindaStation.energy.frozenEnergy2Lind(-10000),
                'Provided energy should be >= 0.'
            );
        });
    });

    describe('#calculate burned energy by amount', function () {
        this.timeout(10000);

        it('should get energy by amount with unit lind', async function () {
            const res = await lindaStation.energy.lind2BurnedEnergy(1);
            assert.isTrue(res >= 0)
        });

        it('should get energy by amount with unit sun', async function () {
            const res = await lindaStation.energy.lind2BurnedEnergy(10e5, { unit: 'sun' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                lindaStation.energy.lind2BurnedEnergy(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                lindaStation.energy.lind2BurnedEnergy(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate lind amount by burned energy', function () {
        this.timeout(10000);

        it('should get lind by burned energy with unit lind', async function () {
            const res = await lindaStation.energy.burnedEnergy2Lind(10e4);
            assert.equal(res, 1)
        });

        it('should get lind by burned energy with unit sun', async function () {
            const res = await lindaStation.energy.burnedEnergy2Lind(10e4, { unit: 'sun' });
            assert.equal(res, 10e5)
        });

        it('should throw invalid energy error', async function () {
            await assertThrow(
                lindaStation.energy.burnedEnergy2Lind(''),
                'Invalid energy provided.'
            );

            await assertThrow(
                lindaStation.energy.burnedEnergy2Lind(-10000),
                'Provided energy should be >= 0.'
            );
        });
    });

    describe('#calculate max energy limit', function () {
        this.timeout(10000);

        it('should get max energy limit', async function () {
            const res = await lindaStation.energy.getMaxEnergyLimit('4165519569C1A1E81646902142DD56A791DEBCB0D8', 1000);
            assert.isTrue(res.accountEnergy >= 0)
            assert.isTrue(res.accountEnergyUsed >= 0)
            assert.isTrue(res.accountLindEnergy >= 0)
            assert.isTrue(res.accountTotalEnergy >= 0)
            assert.isTrue(res.feeLimit >= 0)
            assert.isTrue(res.feeLimitEnergy >= 0)
            assert.isTrue(res.maxEnergyLimit >= 0)
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                lindaStation.energy.getMaxEnergyLimit('123213123', 1000),
                'Invalid address provided.'
            );

            await assertThrow(
                lindaStation.energy.getMaxEnergyLimit('4165519569C1A1E81646902142DD56A791DEBCB0D8', -10000),
                'Provided feeLimit should be >= 0.'
            );

            await assertThrow(
                lindaStation.energy.getMaxEnergyLimit('4165519569C1A1E81646902142DD56A791DEBCB0D8', 10000),
                'Max fee limit has a max limit of 1000 lind.'
            );

            await assertThrow(
                lindaStation.energy.getMaxEnergyLimit('412520158E5741015AF4822A5CB4B9F6BF86E5711E', 1000),
                'Account not exists or not activated.'
            );
        });
    });

})

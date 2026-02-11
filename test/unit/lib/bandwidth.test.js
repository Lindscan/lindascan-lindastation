const {assert, assertThrow, lindaStationBuilder, net} = require('../../helpers/includes')


describe('#bandwidth functional unit test', function () {

    let lindaStation;

    before(async function () {
        this.timeout(10000);
        lindaStation = lindaStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#calculate frozen bandwidth by amount', function () {
        this.timeout(10000);

        it('should get bandwidth by amount with unit lind', async function () {
            const res = await lindaStation.bp.lind2FrozenBandwidth(1);
            assert.isTrue(res >= 0)
        });

        it('should get bandwidth by amount with unit sun', async function () {
            const res = await lindaStation.bp.lind2FrozenBandwidth(10e5, { unit: 'sun' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                lindaStation.bp.lind2FrozenBandwidth(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                lindaStation.bp.lind2FrozenBandwidth(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate lind amount by frozen bandwidth', function () {
        this.timeout(10000);

        it('should get lind by frozen bandwidth with unit lind', async function () {
            const res = await lindaStation.bp.frozenBandwidth2Lind(7300.356788039041);
            assert.isTrue(res >= 0)
        });

        it('should get lind by frozen bandwidth with unit sun', async function () {
            const res = await lindaStation.bp.frozenBandwidth2Lind(7300.356788039041, { unit: 'sun' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid bandwidth error', async function () {
            await assertThrow(
                lindaStation.bp.frozenBandwidth2Lind(''),
                'Invalid bandwidth provided.'
            );

            await assertThrow(
                lindaStation.bp.frozenBandwidth2Lind(-10000),
                'Provided bandwidth should be >= 0.'
            );
        });
    });

    describe('#get account bandwidth', function () {
        this.timeout(10000);

        it('should get max energy limit', async function () {
            const res = await lindaStation.bp.getAccountBandwidth('4165519569C1A1E81646902142DD56A791DEBCB0D8');
            assert.isTrue(res.balance >= 0)
            assert.isTrue(res.freebp >= 0)
            assert.isTrue(res.freebpUsed >= 0)
            assert.isTrue(res.accountbp >= 0)
            assert.isTrue(res.accountbpUsed >= 0)
            assert.isTrue(res.totalbp >= 0)
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                lindaStation.bp.getAccountBandwidth('123213123'),
                'Invalid address provided.'
            );
        });
    });

})

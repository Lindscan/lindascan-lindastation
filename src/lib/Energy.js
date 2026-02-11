import Base from './Base';

export default class Energy extends Base {

    constructor(lindaStation) {
        super(lindaStation);
        this.defaultTotalEnergyLimit = 10e10
    }

    async lind2FrozenEnergy(amount, options = {}) {

        this.validator.validateNumber({ n: 'amount', v: amount}, '>=', 0);

        if (options.unit === 'sun')
            amount = this.apis.toLind(amount);

        let totalEnergyWeight = await this.apis.getResourceByName('EnergyWeight');
        let totalEnergyLimit = await this.apis.getChainParameterByName('getTotalEnergyCurrentLimit');
        return (amount * (totalEnergyLimit ? totalEnergyLimit : this.defaultTotalEnergyLimit)) / totalEnergyWeight;
    }

    async frozenEnergy2Lind(energy, options = {}) {

        this.validator.validateNumber({ n: 'energy', v: energy}, '>=', 0);

        let totalEnergyWeight = await this.apis.getResourceByName('EnergyWeight');
        let totalEnergyLimit = await this.apis.getChainParameterByName('getTotalEnergyLimit');
        let amount = (energy * totalEnergyWeight) / (totalEnergyLimit ? totalEnergyLimit : this.defaultTotalEnergyLimit);

        if (options.unit === 'sun') {
            amount = this.apis.fromLind(amount);
        }
        return amount;
    }

    async lind2BurnedEnergy(amount, options = {}) {

        this.validator.validateNumber({ n: 'amount', v: amount}, '>=', 0);

        if (options.unit === 'sun')
            amount = this.apis.toLind(amount);

        let energyFee = await this.apis.getChainParameterByName("getEnergyFee");
        return this.apis.fromLind(amount) / energyFee;
    }

    async burnedEnergy2Lind(energy, options = {}) {

        this.validator.validateNumber({ n: 'energy', v: energy}, '>=', 0);

        let energyFee = await this.apis.getChainParameterByName("getEnergyFee");
        let amount = energy * this.apis.toLind(energyFee);

        if (options.unit === 'sun') {
            amount = this.apis.fromLind(amount);
        }
        return amount;
    }

    async getMaxEnergyLimit(address, feeLimit, options = {}) {

        this.validator.validateAddress(address);
        this.validator.validateNumber({ n: 'feeLimit', v: feeLimit}, '>=', 0);

        if (options.unit === 'sun') {
            this.apis.toLind(feeLimit);
        }
        if (feeLimit > 1000) {
            throw new Error('Max fee limit has a max limit of 1000 lind.');
        }

        let account = await this.lindaWeb.lind.getAccount(address);
        if (!account || Object.keys(account).length === 0) {
            throw new Error('Account not exists or not activated.');
        }
        if (account.balance === undefined) account.balance = 0;

        let params = await this.apis.getChainParametersByName(['getTotalEnergyLimit', 'getEnergyFee']);
        let totalEnergyLimit = this.apis.filterData(params.getTotalEnergyLimit);
        let energyFee = this.apis.filterData(params.getEnergyFee);

        let resources = await this.apis.getResourcesByName(['EnergyLimit', 'EnergyUsed', 'TotalEnergyWeight'], address);
        let energyLimit = this.apis.filterData(resources.EnergyLimit);
        let energyUsed = this.apis.filterData(resources.EnergyUsed);
        let totalEnergyWeight = this.apis.filterData(resources.TotalEnergyWeight);

        let ratio = totalEnergyLimit / totalEnergyWeight;
        let accountLindEnergy = (account.balance / energyFee);
        let accountTotalEnergy = energyLimit + accountLindEnergy - energyUsed;
        let feeLimitEnergy = (feeLimit * ratio);

        let maxEnergyLimit;
        if (energyLimit > feeLimitEnergy) {
            maxEnergyLimit = Math.min(accountTotalEnergy, feeLimitEnergy);
        } else {
            maxEnergyLimit = accountTotalEnergy;
        }

        return {
            accountEnergy: energyLimit,
            accountEnergyUsed: energyUsed,
            accountLindEnergy: accountLindEnergy,
            accountTotalEnergy: accountTotalEnergy,
            feeLimit: feeLimit,
            feeLimitEnergy: feeLimitEnergy,
            maxEnergyLimit: maxEnergyLimit
        }

    }
}

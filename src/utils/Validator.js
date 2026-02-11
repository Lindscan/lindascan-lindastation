export default class Validator {

    constructor(lindaStation) {
        this.lindaWeb = lindaStation.lindaWeb;
        this.utils = this.lindaWeb.utils;
    }

    validateNumber(param, opt, val) {
        if (!param.v || typeof param.v !== 'number') {
            throw new Error(`Invalid ${param.n} provided.`);
        }
        switch (opt) {
            case '>=': {
                if (param.v < val)
                    throw new Error(`Provided ${param.n} should be ${opt} ${val}.`);
            }
        }
    }

    validateAddress(address) {
        if (!this.lindaWeb.isAddress(address))
            throw new Error('Invalid address provided.');
    }

};

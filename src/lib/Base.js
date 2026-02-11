import LindaStation from '../index';
import Validator from '../utils/Validator';
import Apis from '../utils/Apis';

class Base {

    constructor(lindaStation) {
        if (!lindaStation || !(lindaStation instanceof LindaStation))
            throw new Error('Expected instance of LindaStation');

        this.lindaStation = lindaStation;
        this.lindaWeb = lindaStation.lindaWeb;
        this.apis = new Apis(this.lindaStation);
        this.validator = new Validator(this.lindaStation);
        this.utils = this.lindaWeb.utils;
    }

}

export default Base

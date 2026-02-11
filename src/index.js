import Energy from 'lib/Energy';
import Bandwidth from 'lib/Bandwidth';
import Witness from 'lib/Witness';
import Apis from 'utils/Apis';

export default class LindaStation {

    constructor(lindaWeb = false) {
        if (!lindaWeb)
            throw new Error('Expected instance of LindaWeb');

        if (!lindaWeb.defaultAddress)
            throw new Error('Expected default account set up in LindaWeb');
        this.lindaWeb = lindaWeb;
        this.energy = new Energy(this);
        this.defaultAddress = lindaWeb.defaultAddress;
        this.bp = new Bandwidth(this);
        this.witness = new Witness(this);
        this.apis = new Apis(this);
    }

    setLindaWeb(lindaWeb = false) {
        if (!lindaWeb)
            throw new Error('Expected instance of LindaWeb');
        if (!lindaWeb.defaultAddress)
            throw new Error('Expected default account set up in LindaWeb');
        this.lindaWeb = lindaWeb;
        this.defaultAddress = lindaWeb.defaultAddress;
        this.energy = new Energy(this);
        this.defaultAddress = lindaWeb.defaultAddress;
        this.bp = new Bandwidth(this);
        this.witness = new Witness(this);
        this.apis = new Apis(this);
    }

}

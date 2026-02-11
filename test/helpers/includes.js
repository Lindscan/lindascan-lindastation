const chai = require('chai');
const assert = chai.assert;
const lindaStationBuilder = require('./lindaStationBuilder');
const LindaWeb = require('../setup/LindaWeb');
const { NET } = require('./config');
const assertThrow = require('./assertThrow');


module.exports = {
    chai,
    assert,
    assertThrow,
    lindaStationBuilder,
    LindaWeb,
    net: NET
};

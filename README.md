## What is Linda Station SDK?

__[Linda Station SDK - Developer Document](https://developers.lindacoin.org/docs/linda-station-intro)__

Linda Station SDK is a library for estimating Linda energy and bandwidth consumption based on Linda network. Developers can quickly review energy and bandwidth points information before deploying/triggering a smart contract or make a transaction.


## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

Linda Station SDK is also compatible with frontend frameworks such as:
- Angular
- React
- Vue

You can also ship Linda Station SDK in a Chrome extension.

## Installation

__[Linda Station SDK - NPM Package](https://www.npmjs.com/package/@lindascan/lindastation)__


### NPM
```bash
> npm install @lindascan/lindastation
```

### Yarn
```bash
> yarn add @lindascan/lindastation
```

## Build Steps

If you'd like to download and build locally, please follow the steps below.
```bash
> git clone https://github.dev/Lindscan/lindascan-lindastation
> cd lindastation-sdk
> yarn install
> yarn build
> yarn test
```

## Usage

### Install [LindaWeb](https://github.com/lindaprotocol/lindaweb)

### NPM
```bash
> npm install lindaweb
```

### Yarn
```bash
> yarn add lindaweb
```

### Initialize LindaWeb and create Linda Station SDK instance

```js
import LindaStation from '@lindascan/lindastation';
import LindaWeb from '@lindacoin/lindaweb';

const fullNode = new HttpProvider('https://api.lindagrid.lindacoin.org');
const solidityNode = new HttpProvider('https://api.lindagrid.lindacoin.org');
const eventServer = new HttpProvider('https://api.lindagrid.lindacoin.org');

const privateKey = 'your private key';

const lindaWeb = new LindaWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

// Constructor params are the lindaWeb object and specification on if the net type is on main net or test net/private net
const lindaStation = new LindaStation(lindaWeb);

// If you want to reset or switch node net work, just try to re-config your lindaWeb and reset in lindaStation sdk.
const newLindaWeb = new LindaWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
lindaStation.setLindaWeb(lindaWeb);
```
## APIs

LindaStation-SDK provides three parts of calculators and some of utils can be used easily to estimate energy, bandwidth and super representatives data.
There are also some sample usages provided in test directory.

### Energy Calculators
```js
// 1. Converter between frozen energy and lind amount.
const res = await lindaStation.energy.lind2FrozenEnergy(1);
const res = await lindaStation.energy.lind2FrozenEnergy(10e5, { unit: 'sun' });

const res = await lindaStation.energy.frozenEnergy2Lind(666.74484);
const res = await lindaStation.energy.frozenEnergy2Lind(666.74484, { unit: 'sun' });

// 2. Converter between burned energy and lind amount.
const res = await lindaStation.energy.lind2BurnedEnergy(1);
const res = await lindaStation.energy.lind2BurnedEnergy(10e5, { unit: 'sun' });

const res = await lindaStation.energy.burnedEnergy2Lind(10e4);
const res = await lindaStation.energy.burnedEnergy2Lind(10e4, { unit: 'sun' });

// 3. Calculator of max energy limit for deploying or triggering contract.
const res = await lindaStation.energy.getMaxEnergyLimit('your hex address', 1000);
```

### Bandwidth Calculators
```js
// 1. Converter between frozen bandwidth points and lind amount.
const res = await lindaStation.bp.lind2FrozenBandwidth(1);
const res = await lindaStation.bp.lind2FrozenBandwidth(10e5, { unit: 'sun' });

const res = await lindaStation.bp.frozenBandwidth2Lind(7300.356788039041);
const res = await lindaStation.bp.frozenBandwidth2Lind(7300.356788039041, { unit: 'sun' });

// 2. API for getting account bandwidth.
const res = await lindaStation.bp.getAccountBandwidth('4165519569C1A1E81646902142DD56A791DEBCB0D8');
```

### Super Representatives Calculators
```js
// 1. Calculator for estimating rank and votes reward by votes amount.
// existed SR/Candidate
const res = await lindaStation.witness.calculateSrReward(1000, '41928c9af0651632157ef27a2cf17ca72c575a4d21');
// New SR/Candidate
const res = await lindaStation.witness.calculateSrReward(1000);

// 2. API for getting current SR reward list.
const res = await lindaStation.witness.getSrVoteRewardList();
```

### Other tools
```js
// 1. Convert between lind and sun.
const res = await lindaStation.apis.fromLind(1);
const res = await lindaStation.apis.toLind(10e5);

// 2. Get account resource by name.
const res = await lindaStation.apis.getResourceByName('EnergyWeight');
const res = await lindaStation.apis.getResourcesByName(['TotalNetLimit', 'TotalNetWeight']);

// 3. Get proposals by name.
const res = await lindaStation.apis.getChainParameterByName('getEnergyFee');
const res = await lindaStation.apis.getChainParametersByName(['getTotalEnergyCurrentLimit', 'getEnergyFee']);
```

const { expect } = require('chai');

const codes = require('../data/codes.js');
const hashes = new Set(require('../data/hashes.js'));

describe('Contract', function () {
  it('test', async function () {
    const [signer] = await ethers.getSigners();

    const gatekeeper = await ethers.getContractAt('theCyberGatekeeperTwo', '0xbB902569a997D657e8D10B82Ce0ec5A5983C8c7C', signer);

    const validCodes = codes.filter(c => hashes.has(ethers.utils.solidityKeccak256(['string'], [c])));

    let pass = false;

    for (let passcode of validCodes) {
      const hash = ethers.utils.solidityKeccak256(['string'], [passcode]);

      if (await gatekeeper.callStatic.acceptedPasscodes_(hash)) {
        continue;
      }

      try {
        const interactorFactory = await ethers.getContractFactory('Contract', signer);
        const interactor = await interactorFactory.deploy(ethers.utils.toUtf8Bytes(passcode));
        await interactor.deployed();
        console.log('='.repeat(80));
        console.log(`Passcode verified: ${ passcode }`);
        console.log('='.repeat(80));
        pass = true;
        break;
      } catch (e) {
        console.log(`Passcode failed: ${ passcode }`);
      }
    }

    expect(pass).to.be.true;
  });
});

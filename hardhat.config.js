require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('hardhat-gas-reporter');

module.exports = {
  solidity: {
    version: '0.4.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: {
      forking: {
        url: `${ process.env.FORK_URL }`,
      },
    },

    generic: {
      url: `${ process.env.NODE_URL }`,
      accounts: {
        mnemonic: `${ process.env.MNEMONIC }`,
      },
    },
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true',
  },
};

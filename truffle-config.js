const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
require("dotenv").config(); // Load .env file

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://matic-mumbai.chainstacklabs.com`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
};

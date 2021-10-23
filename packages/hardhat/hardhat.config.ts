import "@float-capital/solidity-coverage";
import "@nomiclabs/hardhat-waffle";
import "@popcorn/utils/src/envLoader";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { task } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("environment").setAction(async (args, hre) => {
  console.log(process.env.ENV);
});

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    mainnet: {
      chainId: 1,
      url: process.env.RPC_URL,
    },
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    rinkeby: {
      url: process.env.RPC_URL,
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: false,
  },
  mocha: {
    timeout: 120000,
  },
  /*contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },*/
};

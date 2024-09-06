import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-foundry";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999
      },
      viaIR: true,
      evmVersion: "cancun"
    }
  },
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache_hardhat",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {
      forking: {
        enabled: (process.env.FORKING as string === 'true') ? true : false,
        url: `https://virtual.mainnet.rpc.tenderly.co/${process.env.VIRTUAL_TESTNET_ID}`
      }
    }
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS === 'true') ? true : false,
    currency: 'USD',
    L1: "ethereum",
  }
};

export default config;

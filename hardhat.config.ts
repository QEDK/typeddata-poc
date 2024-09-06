import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-foundry";
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
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
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [
        process.env.PRIVATE_KEY as string
      ]
    }
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS === 'true') ? true : false,
    currency: 'USD',
    L1: "ethereum",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};

export default config;

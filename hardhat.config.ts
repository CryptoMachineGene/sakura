import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-verify";

const privateKeys = (process.env.PRIVATE_KEYS || "").split(",").filter(Boolean);

const config: HardhatUserConfig = {
  solidity: { version: "0.8.20", settings: { optimizer: { enabled: true, runs: 200 } } },
  networks: {
    localhost: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY || ""}`,
      accounts: privateKeys
    }
  },
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY || "" }
};
export default config;

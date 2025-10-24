import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Sakura = await ethers.getContractFactory("Sakura");
  const units = BigInt(process.env.SKR_INITIAL_SUPPLY || "1000000"); // 1M
  const decimals = 18n;
  const initialSupply = units * 10n ** decimals;

  console.log("Deployer:", deployer.address);
  console.log("Initial supply:", initialSupply.toString());

  const sakura = await Sakura.deploy(deployer.address, initialSupply);
  await sakura.deployed();

  console.log("Sakura deployed to:", sakura.address);
  console.log("Owner:", await sakura.owner());
  console.log("Version:", await sakura.VERSION());

  const total = await sakura.totalSupply();
  console.log("Total supply:", total.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Use the correct provider constructor
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Get contract to deploy
  const Token = await ethers.getContractFactory("Sakura");

  // Set initial parameters
  const initialOwner = deployer.address; // or use a specific address
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // Adjust the supply as needed

  // Deploy contract
  const token = await Token.deploy(initialOwner, initialSupply);
  await token.deployed();

  console.log(`Token deployed to: ${token.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

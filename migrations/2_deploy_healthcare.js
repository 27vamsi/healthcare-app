const Healthcare = artifacts.require("Healthcare");
const HealthToken = artifacts.require("HealthToken");

module.exports = async function (deployer, network, accounts) {
  // Deploy the HealthToken with an initial supply of 1,000,000 tokens
  await deployer.deploy(HealthToken, 1000000);
  const tokenInstance = await HealthToken.deployed();

  // Use the first account as the initial owner
  const initialOwner = accounts[0];

  // Deploy the Healthcare contract, passing in the initial owner address and HealthToken address
  await deployer.deploy(Healthcare, initialOwner, tokenInstance.address);
};

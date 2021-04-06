const { parseEther } = require("ethers/lib/utils");

const GRANT_TERM = { MONTH: 0, QUARTER: 1, YEAR: 2 };
// This script creates two beneficiaries and one quarterly grant that they are both eligible for. Run this
// Run this instead of the normal deploy.js script
async function main() {
  // We get the contract to deploy
  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;
  console.log("deployer", deployer);
  const BeneficiaryRegistry = await ethers.getContractFactory(
    "BeneficiaryRegistry"
  );
  const beneficiaryRegistry = await BeneficiaryRegistry.deploy(); //issue without address?
  const BeneficiaryRegistercontract = await beneficiaryRegistry.deployed();

  let firstBeneficiaryAddress = accounts[1].address;
  let secondBeneficiaryAddress = accounts[2].address;

  await BeneficiaryRegistercontract.addBeneficiary(
    firstBeneficiaryAddress,
    ethers.utils.formatBytes32String("Beneficiary Amir")
  )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  await BeneficiaryRegistercontract.addBeneficiary(
    secondBeneficiaryAddress,
    ethers.utils.formatBytes32String("Beneficiary Leon")
  )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  const beneficiaryExists = await BeneficiaryRegistercontract.beneficiaryExists(
    firstBeneficiaryAddress
  );
  console.log("beneficiary exists:", beneficiaryExists);

  const GrantRegistry = await ethers.getContractFactory("GrantRegistry");
  const grantRegistry = await GrantRegistry.deploy(beneficiaryRegistry.address);
  const GrantRegistryContract = await grantRegistry.deployed();

  await GrantRegistryContract.createGrant(
    GRANT_TERM.QUARTER,
    [firstBeneficiaryAddress, secondBeneficiaryAddress],
    [1, 2]
  );

  const activeAwardees = await GrantRegistryContract.getActiveAwardees(
    GRANT_TERM.QUARTER
  );
  console.log("active awardees: ", activeAwardees);

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  this.mockPop = await MockERC20.deploy("TestPOP", "TPOP");
  await this.mockPop.mint(deployer, parseEther("1000")); //deployer has 1000 ethers worth of pop
  await this.mockPop.mint(firstBeneficiaryAddress, parseEther("1000"));

  const Staking = await ethers.getContractFactory("Staking");
  this.stakingContract = await Staking.deploy(this.mockPop.address);
  await this.stakingContract.deployed();

  const GrantElections = await ethers.getContractFactory("GrantElections");
  this.grantElectionContract = await GrantElections.deploy(
    this.stakingContract.address,
    beneficiaryRegistry.address,
    this.mockPop.address,
    deployer
  );
  await this.grantElectionContract.deployed();
  await this.grantElectionContract.initialize(GRANT_TERM.QUARTER);

  await this.mockPop
    .connect(accounts[1])
    .approve(this.grantElectionContract.address, parseEther("1000"));
  await this.grantElectionContract
    .connect(accounts[1])
    .registerForElection(accounts[1].address, GRANT_TERM.QUARTER);

  console.log("active awardees: ", activeAwardees);
  console.log("MOCKPOP deployed to:", this.mockPop.address);
  console.log("StakingContract deployed to:", this.stakingContract.address);
  console.log("BeneficiaryRegistry deployed to:", beneficiaryRegistry.address);
  console.log("GrantRegistry deployed to:", grantRegistry.address);
  console.log(
    "GrantElections deployed to:",
    this.grantElectionContract.address
  );

  return {
    beneficiaryRegistryAddress: beneficiaryRegistry.address,
    grantRegistryAddress: grantRegistry.address,
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

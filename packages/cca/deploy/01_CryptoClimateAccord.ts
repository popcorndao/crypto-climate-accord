import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying Agreement", deployer);
  const deployed = await deploy("CryptoClimateAccord", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
    waitConfirmations: 1,
  });

  console.log("Deployed agreement");
  console.log(deployed.receipt);
};

export default main;
main.tags = ["CCA"];

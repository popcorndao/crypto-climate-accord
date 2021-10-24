import { parseEther } from "@ethersproject/units";
import { formatEther } from "ethers/lib/utils";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getSignerFrom } from "../lib/utils/getSignerFrom";
import { MockERC20__factory } from "../typechain/factories/MockERC20__factory";

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("TestPOP", {
    from: deployer,
    args: ["Test POP", "TPOP", 18],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
    contract: "MockERC20",
    waitConfirmations: 1,
  });

  const signer = getSignerFrom(
    hre.config.namedAccounts.deployer as string,
    hre
  );

  await mintPOP((await deployments.get("TestPOP")).address, signer, deployer);
};

const mintPOP = async (address: string, signer: any, recipient: string) => {
  const POP = MockERC20__factory.connect(address, signer);
  console.log("Minting POP for", recipient);
  await (await POP.mint(recipient, parseEther("1000000000"))).wait(1);
  console.log("Total POP supply", formatEther(await POP.totalSupply()));
};

module.exports = main;
module.exports.tags = ["LBP"];

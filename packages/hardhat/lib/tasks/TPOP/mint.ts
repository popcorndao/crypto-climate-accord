import { formatEther, parseEther } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { MockERC20__factory } from "../../../typechain/factories/MockERC20__factory";
interface Args {
  to: string;
  amount: string;
}

async function main(args: Args, hre: HardhatRuntimeEnvironment) {
  if (hre.network.name !== "kovan") {
    throw new Error(
      `This task is only valid for Kovan. The selected network is: ${hre.network.name}`
    );
  }
  const signer = hre.askForSigner();
  const address = (await hre.deployments.get("TestPOP")).address;
  const mintAmount = parseEther(args.amount);

  const POP = MockERC20__factory.connect(address, signer);
  await (await POP.mint(args.to, mintAmount)).wait(1);
  console.log("Minted", formatEther(mintAmount), "TPOP");
}

export default task("TPOP:mint", "burns TPOP")
  .addParam("to", "address to transfer to")
  .addParam("amount", "amount to mint")
  .setAction(main);

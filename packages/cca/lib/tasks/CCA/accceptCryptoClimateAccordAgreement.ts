import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getBytes32FromIpfsHash } from "./helpers/getBytes32FromIpfsHash";

interface Args {
  metadata: string;
  accept: string;
}

async function main(args: Args, hre: HardhatRuntimeEnvironment) {
  const signer = hre.askForSigner();

  const address = (await hre.deployments.get("CryptoClimateAccord")).address;

  const accord = await hre.ethers.getContractAt(
    "CryptoClimateAccord",
    address,
    signer
  );

  console.log("Accepting CCA");

  const tx = await accord.acceptCryptoClimateAccordAgreement(
    getBytes32FromIpfsHash(args.metadata),
    Boolean(parseInt(args.accept))
  );
  console.log((await tx.wait(1)).transactionHash);
}

export default task(
  "CCA:acceptCryptoClimateAccordAgreement",
  "accepts Crypto Climate Accord agreement"
)
  .addParam("metadata", "IPFS cid containing metadata")
  .addParam("accept", "1 for true, 0 for false")
  .setAction(main);

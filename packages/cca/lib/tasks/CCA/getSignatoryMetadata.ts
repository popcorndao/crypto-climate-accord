import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import fetch from "node-fetch";
import { getIpfsHashFromBytes32 } from "./helpers/getIpfsHashFromBytes32";

interface Args {
  address: string;
}

async function main(args: Args, hre: HardhatRuntimeEnvironment) {
  const address = (await hre.deployments.get("CryptoClimateAccord")).address;

  const accord = await hre.ethers.getContractAt("CryptoClimateAccord", address);

  console.log("Retrieving Signatory Metadata");

  const bytes32Cid = await accord.getSignatoryMetadata(
    args.address.toLowerCase()
  );
  const ipfsCid = getIpfsHashFromBytes32(bytes32Cid);
  const metadata = await fetch(
    `https://popcorn.mypinata.cloud/ipfs/${ipfsCid}`
  );
  console.log(await metadata.json());
}

export default task(
  "CCA:getSignatoryMetadata",
  "retrieves signatory metadata from IPFS"
)
  .addParam("address", "address of signatory")
  .setAction(main);

# Crypto Climate Accord

This pacakges includes the Crypto Climate Accord contract along with tasks to interact with the contract.


## Tasks

```
  CCA:acceptCryptoClimateAccordAgreement        accepts Crypto Climate Accord agreement
  CCA:getSignatoryMetadata                      retrieves signatory metadata from IPFS
```

## Prerequisites

1.  copy `.env.example` to `.env` and add  values for `RPC_URL` or `INFURA_PROJECT_ID` 
1. Install project  dependencies using `yarn`

## Usage

The following commands should be run from `packages/cca` directory:

1. Accepting agreement:
```
$ yarn hardhat CCA:acceptCryptoClimateAccordAgreement --help                                                                                            
Usage: hardhat [GLOBAL OPTIONS] CCA:acceptCryptoClimateAccordAgreement --accept <STRING> --metadata <STRING>

OPTIONS:

  --accept      1 for true, 0 for false 
  --metadata    IPFS cid containing metadata 

CCA:acceptCryptoClimateAccordAgreement: accepts Crypto Climate Accord agreement
```

An example metadata json file is found here: https://github.com/popcorndao/sweet-caramel/blob/952bbe0ca9ab3abe4ff0b2148545ab309ac9aa30/packages/hardhat/lib/tasks/CCA/popcorn-cca-metadata-example.json

The json file should first be uploaded to IPFS and the corresponding CID will be passed as the `--metadata` value;


e.g. 
```
yarn hardhat CCA:acceptCryptoClimateAccordAgreement --metadata QmNN5ZLfXWde571S3eRekLboq5bdnn6DEXSnPQSo7eqq3R --accept 1 --network rinkeby
```


2. Getting signatory metadata:
```
yarn hardhat CCA:getSignatoryMetadata --address 0x4a7a11D12805A7570bD1CB65E1Ca1396a0B1aF6F --network rinkeby
```


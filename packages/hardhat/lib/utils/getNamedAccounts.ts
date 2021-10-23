// setup public/external addresses here like DAI/USDC/ etc.

export default function getNamedAccounts() {
  return {
    DAO: {
      mainnet: "0xbD94fc22E6910d118187c8300667c66eD560A29B",
      rinkeby: "0x7D9B21704B5311bB480f0109dFD5D84ed1207e11",
    },
    DAO_Agent: {
      mainnet: "0x0ec6290abb4714ba5f1371647894ce53c6dd673a",
      rinkeby: "0xc0e334b5bc637eac105da3d84c7c1bd342ae8ae9",
    },
    TokenManager: {
      mainnet: "0x50a7c5a2aa566eb8aafc80ffc62e984bfece334f",
      rinkeby: "0xd6c570fa672eb252fc78920a54fc6a2dc9a54708",
    },
  };
}

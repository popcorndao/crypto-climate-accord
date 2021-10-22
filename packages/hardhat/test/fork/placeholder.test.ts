import { network } from "hardhat";

describe("placeholder", () => {
  beforeEach(async function () {
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.RPC_URL,
            blockNumber: "12724811",
          },
        },
      ],
    });
  });

  it("should pass", () => {
    expect(true).toBe(true);
  });
});

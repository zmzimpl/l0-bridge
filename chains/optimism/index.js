import { JsonRpcProvider } from "ethers";

import { USDC } from "./usdc";
import { STG, STGVotingEscrow } from "./stg";
import { LayerZero } from "./layerzero";

const provider = new JsonRpcProvider("https://opt-mainnet.g.alchemy.com/v2/uLkUKNuaq3tSSrlprMzv4Vp31_EcnuRH");

export const optimism = {
  name: "Optimism",
  provider,
  nativeToken: {
    ticker: "ETH",
    coinGeckoId: "ethereum",
    decimals: 18,
  },
  contracts: {
    tokens: {
      USDC,
      STG,
    },
    services: {
      LayerZero,
      STGVotingEscrow,
    },
  },
  chainId: 10,
  lzChainId: 111,
};

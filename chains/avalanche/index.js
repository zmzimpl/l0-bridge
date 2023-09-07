import { JsonRpcProvider } from "ethers";

import { USDC } from "./usdc";
import { WAVAX } from "./wavax";
import { WETH } from "./weth";
import { STG, STGVotingEscrow } from "./stg";
import { LayerZero } from "./layerzero";

const provider = new JsonRpcProvider("https://rpc.ankr.com/avalanche");

export const avalanche = {
  name: "Avalanche",
  provider,
  nativeToken: {
    ticker: "AVAX",
    coinGeckoId: "avalanche-2",
  },
  contracts: {
    tokens: {
      USDC,
      WAVAX,
      WETH,
      STG,
    },
    services: {
      LayerZero,
      STGVotingEscrow,
    },
  },
  chainId: 43114,
  lzChainId: 106,
};

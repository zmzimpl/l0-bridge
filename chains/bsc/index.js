import { JsonRpcProvider } from "ethers";

import { USDT } from "./usdt";
import { USDC } from "./usdc";
import { STG, STGVotingEscrow } from "./stg";
import { ProxyERC20 } from "./proxyErc20";
import { LayerZero } from "./layerzero";

const provider = new JsonRpcProvider("https://rpc.ankr.com/bsc");

export const bsc = {
  name: "BSC",
  provider,
  nativeToken: {
    ticker: "BNB",
    coinGeckoId: "binancecoin",
    decimals: 18,
  },
  contracts: {
    tokens: {
      USDT,
      USDC,
      STG,
    },
    services: {
      ProxyERC20,
      LayerZero,
      STGVotingEscrow,
    },
  },
  chainId: 56,
  lzChainId: 102,
};

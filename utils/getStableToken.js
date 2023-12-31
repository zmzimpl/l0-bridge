import { chains } from "../chains";

export const getStableToken = (chain) => {
  const {
    name,
    contracts: {
      tokens: { USDC, USDT, BridgedUSDC },
    },
  } = chain;

  return name === chains.bsc.name
    ? USDT
    : name === chains.arbitrum.name
    ? BridgedUSDC
    : USDC;
};

export const config = {
  slippage: 1,
  chainsForInteractions: [
    "avalanche",
    "polygon",
    "arbitrum",
    "optimism",
    "bsc",
  ],
  chainsCount: {
    min: 3,
    max: 4,
  },
  interactionsInterval: {
    min: 60,
    max: 240,
  },
  interactionsCount: {
    transferTokenStargate: Infinity,
  },
};

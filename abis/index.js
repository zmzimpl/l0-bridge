import LZRouter from "./LZRouter.json" assert { type: "json" };
import LZEndpoint from "./LZEndpoint.json" assert { type: "json" };
import StargatePool from "./StargatePool.json" assert { type: "json" };
import ProxyERC20 from "./ProxyERC20.json" assert { type: "json" };
import StargateToken from "./StargateToken.json" assert { type: "json" };
import STGVotingEscrow from "./STGVotingEscrow.json" assert { type: "json" };

export {
  LZRouter,
  LZEndpoint,
  StargatePool,
  ProxyERC20,
  StargateToken,
  STGVotingEscrow,
};

export * from "./avalanche";
export * from "./arbitrum";
export * from "./bsc";
export * from "./polygon";
export * from "./optimism";

import { prepare } from "./prepare";
import { execute } from "./execute";

export const transferTokenStargate = {
  name: "transferTokenStargate",
  moduleName: "stargate.finance",
  label: "Bridge using Stargate",
  availableChains: ["polygon", "bsc", "arbitrum", "optimism", "avalanche"],
  prepare,
  execute,
};

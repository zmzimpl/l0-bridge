import { Wallet, formatEther } from "ethers";
import * as interactions from "../interactions";
import {
  getStableToken,
  getTokenBalance,
  logBridge,
  randint,
  randomizeInteractions,
  shuffleArray,
  sleep,
  workLogger,
  chalk,
} from "../utils";
import { config } from "../config";
import { CHAINS_TO_WORK_WITH, chains } from "../chains";
import { REQUIRED_NATIVE_USD_AMOUNT_FOR_ACCOUNT } from "../constants";
import { getUsdPrice } from "../api";

const {
  interactionsInterval,
  interactionsCount,
} = config;

const getRandomChain = (sieve, filter = []) => {
  const shuffledChains = shuffleArray(
    sieve.filter((chain) => !filter.includes(chain))
  );

  if (shuffledChains.length === 0) {
    const randomChainName = shuffleArray(
      CHAINS_TO_WORK_WITH.filter((chain) => !filter.includes(chain))
    )[0];
    return chains[randomChainName];
  }

  return chains[shuffledChains[0]];
};

const areAllInteractionsDone = (interactionsDone) =>
  Object.entries(interactionsDone).every((entry) => {
    const [interactionName, interactionCount] = entry;
    return interactionCount >= interactionsCount[interactionName];
  });

export const work = async ({ keys, sieve }, interactionsDone) => {
  const { evmKey } = keys;

  const todos = randomizeInteractions(sieve, interactionsDone);
  for (const [index, todo] of todos.entries()) {
    const { chainName, chainInteractions } = todo;

    if (chainInteractions.length === 0) {
      break;
    }

    const chain = chains[chainName];
    const { provider } = chain;

    const evmWallet = new Wallet(evmKey, provider);
    let nativeBalance;
    try {
      nativeBalance = await provider.getBalance(evmWallet.address);
    } catch (error) {
      nativeBalance = await provider.getBalance(evmWallet.address);
    }

    const stableToken = getStableToken(chain);
    let stableBalance;
    try {
      stableBalance = await getTokenBalance(evmWallet, {
        token: stableToken,
      });
    } catch (error) {
      stableBalance = await getTokenBalance(evmWallet, {
        token: stableToken,
      });
    }

    const log = workLogger({ walletAddress: evmWallet.address, chainName });
    for (const interaction of chainInteractions) {
      let destChain =
        index === todos.length - 1
          ? getRandomChain(
              sieve.length === 1 ? config.chainsForInteractions : sieve,
              [chainName]
            )
          : chains[todos[index + 1].chainName];

      const destStableToken = getStableToken(destChain);

      log(`Executing ${interaction.label}...`);
      try {
        switch (interaction.name) {
          case interactions.transferTokenStargate.name:
            logBridge({
              log,
              moduleName: interactions.transferTokenStargate.moduleName,
              toChainName: destChain.name,
            });

            await interactions.transferTokenStargate.execute(evmWallet, {
              fromToken: stableToken,
              toToken: destStableToken,
              toChainId: destChain.chainId,
              amount: stableBalance,
            });
            break;
          default:
            break;
        }
        const sleepFor = randint(
          interactionsInterval.min,
          interactionsInterval.max
        );
        console.log(chalk.gray(`Sleeping for ${sleepFor} seconds...`));
        await sleep(sleepFor);
      } catch (err) {
        log(
          `An unexpected error occurred when executing ${interaction.name}!\n ${err}`
        );
      }
    }
  }

  if (sieve.length === 0 || areAllInteractionsDone(interactionsDone)) {
    console.log(chalk.greenBright(`Finished work!`));
  } else {
    // Get rid of chains with not enough balance for next iteration
    const chainsWithBalance = (
      await Promise.all(
        sieve.map(async (chain) => {
          const { provider, nativeToken } = chains[chain];
          const evmWallet = new Wallet(evmKey, provider);

          const nativeBalance = formatEther(
            await provider.getBalance(evmWallet.address)
          );
          const usdPrice = await getUsdPrice(nativeToken.ticker);
          const nativeBalanceInUsd = +nativeBalance * +usdPrice;

          if (nativeBalanceInUsd > REQUIRED_NATIVE_USD_AMOUNT_FOR_ACCOUNT) {
            return chain;
          }
        })
      )
    ).filter((chain) => chain);
    await work({ keys, sieve: chainsWithBalance }, interactionsDone);
  }
};

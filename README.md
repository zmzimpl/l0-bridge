![](https://ibb.co/prJKWRL)
![](https://ibb.co/zFQp0sf)
# L0(LayerZero) Bridge, fork from [aio-l0](https://github.com/sunsetlover36/aio-l0)

## Warning
**This script is only for learning and communication purposes, please decide whether to use it based on personal judgment, I will not be responsible for any loss in the process of use**

## Why fork
Since the source code repository has a lot of other features that I don't need, you can check out the source code repository if you need it. Another reason is that I'm not sure if the source code repository has left a backdoor in the code, so I carefully checked the code by organizing myself and confirmed that there is no backdoor before I dared to use it, and the source code repository has a problem with Optimism and Arbitrum's cross-chaining of the two chains, so I've done a little bit to fix it.

## Supported networks

- Avalanche
- Arbitrum
- BSC
- Optimism
- Polygon

## Features
Bridge USDC/USDT with Stargate Bridge 

使用 Stargate Bridge 桥接 USDC/USDT

- [Stargate Bridge](https://stargate.finance/transfer/)

## Customize settings
In the `config.js` file, you can customize settings.

- `slippage` is responsible for the default slippage during swaps and other conversions
- `chainsForInteractions` is responsible for the list of networks the software will work with
- `chainsCount` is responsible for the number of networks to be affected (from and to)
- `interactionsInterval` is responsible for how many seconds there should be a break between interactions (from and to)
- `interactionsCount` is responsible for how many times you need to do an action. If you want to do some action indefinitely, just set the numbers `Infinity` together

In the `constants/index.js` file, you can customize bridge details.

- `RQUIRED_STABLE_USD_AMOUNT_FOR_MAIN_ACCOUNT` is the minimum stablecoin balance setting in the wallet, below which the chain will not be used as a root chain
- `REQUIRED_NATIVE_USD_AMOUNT_FOR_ACCOUNT` is the minimun native coin balance setting in the wallet, if there exists a chain that doesn't have enough balance to be used as gas, the wallet is not executed.



## Before launch
The main stable token for BSC is **USDT**, for other networks it is **USDC**

1. Spread the commissions over the desired networks (from $2, in `constants/index.js`)
2. Send stable tokens to one of the networks (from $0.5, in `constants/index.js`)
3. Enter private keys into `keys.example.json` file (you need private keys for EVM, there is an example inside).
4. Rename `keys.example.json` to `keys.json`.
5. Run the software

## Start-up instructions
1. Install [Nodejs](https://nodejs.org/en/download)
2. Clone the repository or download the archive
3. Go to the folder with the software in the console and write the command `npm install`
4. Type `npm run start` in the console to start the software

## You have to keep in mind
The software approves 10x of what it is going to bridge. That is, if 500 USDC is bridged, then 5000 USDC will be approved.

If you find bugs or encounter other problems with the software - tweet [@zmzimpl](https://twitter.com/zmzimpl) in Twitter.

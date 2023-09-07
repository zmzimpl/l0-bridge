# L0(LayerZero) Bridge, 源代码库 [aio-l0](https://github.com/sunsetlover36/aio-l0)

## 警告

**此脚本仅用于学习和交流目的，请基于个人判断决定是否使用，我不对任何使用过程中出现的损失负责**

## 为什么要 Fork

由于源代码仓库有很多其他我不需要的功能，如果你需要，可以查看源代码仓库。另一个原因是我不确定源代码仓库是否在代码中留有后门，所以我仔细检查了代码后，基于我的经验确认没有后门才使用它，并且源代码仓库在 Optimism 和 Arbitrum 的两个链的跨链中存在 Bug，我做了一些修复。

## 支持的网络

- Avalanche
- Arbitrum
- BSC
- Optimism
- Polygon

## 功能

使用 Stargate Bridge 跨链 USDC/USDT

- [Stargate Bridge](https://stargate.finance/transfer/)

## 自定义设置

在 `config.js` 文件中，你可以自定义设置。

- `slippage` 负责转换过程中的默认滑点
- `chainsForInteractions` 要进行哪些链的交互
- `chainsCount` 负责受影响的网络数量
- `interactionsInterval` 交互间隔
- `interactionsCount` 进行多少次操作。如果你想无限次地进行跨链，设置为 `Infinity`

在 `constants/index.js` 文件中，你可以自定义跨链细节。

- `RQUIRED_STABLE_USD_AMOUNT_FOR_MAIN_ACCOUNT` 是钱包中的最小稳定币余额设置，低于此金额，链不会被用作根链
- `REQUIRED_NATIVE_USD_AMOUNT_FOR_ACCOUNT` 是钱包中的最小本地币余额设置，如果存在一个链的余额不足以用作燃气，则钱包不执行。

## 启动前注意

BSC 的主要稳定币是 **USDT**，对于其他网络，它是 **USDC**

1. 将 gas 分散到所需的网络中（默认 2$，在`constants/index.js`中）
2. 向你要交互的链发送稳定币（默认 0.5$，在`constants/index.js`中）
3. 在 `keys.example.json` 文件中输入私钥（你需要 EVM 的私钥，里面有一个示例）。
4. 将 `keys.example.json` 重命名为 `keys.json`。
5. 运行软件

## 启动说明

1. 安装 [Nodejs](https://nodejs.org/en/download)
2. clone 代码
3. 在控制台中转到软件的文件夹并输入命令 `npm install`
4. 在控制台中输入 `npm run start` 来启动软件

## 你必须记住

软件批准的金额是其即将跨链的金额的10倍。也就是说，如果跨链了 500 USDC，那么将批准 5000 USDC。
如果你发现软件的错误或遇到其他问题 - 请在Twitter上发送消息给 [@zmzimpl](https://twitter.com/zmzimpl)。

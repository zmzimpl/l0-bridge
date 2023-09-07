import { readFileSync } from "fs";
import consoleStamp from "console-stamp";

import * as interactions from "./interactions";
import { decrypt, getDir, logIntro } from "./utils";
import { prepare, work } from "./scenarios";
// import readlineSync from "readline-sync";

const main = async () => {
  const keys = JSON.parse(readFileSync(getDir("keys.json"), "utf8"));
  const decryptKeys = keys;
  const preparedKeysList = await prepare(decryptKeys);
  await Promise.all(
    preparedKeysList.map(async (preparedKeys) => {
      const interactionsDone = Object.fromEntries(
        Object.keys(interactions).map((interaction) => [interaction, 0])
      );
      await work(preparedKeys, interactionsDone);
    })
  );
};

// 如果不想明文存储私钥，可以使用 utils 中的 encrypt.js 对私钥进行加密后使用以下代码
// const main = async () => {
//   const password1 = readlineSync.question("Password1: ", {
//     hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
//   });
//   const password2 = readlineSync.question("Password2: ", {
//     hideEchoBack: true, // The typed text on screen is hidden by `*` (default).
//   });
//   if (password1 && password2) {
//     const keys = JSON.parse(readFileSync(getDir("keys.json"), "utf8"));
//     const decryptKeys = keys.map((key) => {
//       return {
//         evmKey: decrypt(key.evmKey, password1, password2),
//         aptosKey: key.aptosKey,
//       };
//     });
//     const preparedKeysList = await prepare(decryptKeys);
//     await Promise.all(
//       preparedKeysList.map(async (preparedKeys) => {
//         const interactionsDone = Object.fromEntries(
//           Object.keys(interactions).map((interaction) => [interaction, 0])
//         );
//         await work(preparedKeys, interactionsDone);
//       })
//     );
//   }
// };

logIntro();
consoleStamp(console, {
  format: ":date(yyyy/mm/dd HH:MM:ss)",
});
main();

#!/usr/bin/env zx
import fs from "fs";
async function main() {
  const data = { a: "peace" };
  async function write() {
    fs.appendFileSync("./blessed.txt", JSON.stringify("pree") + "\n", (err) => {
      if (err) {
        if (err) {
          console.log(err);
        }
      }
    });
  }
  write();
  give();
  com();

  async function give() {
    await $`git add .`;
  }
  async function com() {
    return await $`git commit --quiet --date "jan 31 2024 02:10:00 GMT+0100 (West Africa Standard Time)" -m "Periwnkl: kickstart"`;
  }
}

main();
//
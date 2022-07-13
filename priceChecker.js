const log = require("./logHandler");
const email = require("./emailHandler");
const https = require("https");

const delay = async function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async function () {
  log.writeLog("start");

  //delay randomly from 1s to 120s
  let delayInMs = Math.random() * (120000 - 1000) + 1000;
  await delay(delayInMs);

  https
    .get(
      "https://d.uniqlo.com.hk/p/product/i/product/spu/pc/query/u0000000020319/zh_HK",
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          log.writeLog(data);
          data = JSON.parse(data);
          if (
            data.resp[0].summary.minPrice < 79 ||
            data.resp[0].summary.maxPrice < 79
          ) {
            email.sendEmail();
            log.writeLog("email sent!");
          }
        });
      }
    )
    .on("error", (err) => {
      log.writeLog("Error: " + err.message);
    });
};

main();

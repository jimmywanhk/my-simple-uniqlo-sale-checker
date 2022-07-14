const moment = require("moment");
const fs = require("fs");

const writeLog = (text) => {
  let date1 = moment(new Date());
  fs.appendFile(
    "log.txt",
    `[${date1.format("YYYY-MM-DD HH:mm:ss")}]: ${text}\n`,
    function (err) {
      if (err) throw err;
    }
  );
};

module.exports = { writeLog };

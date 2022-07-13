const AWS = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: "xxx",
  secretAccessKey: "xxx",
  region: "ap-southeast-1",
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = () => {
  let params = {
    Source: "from@xxx.com",
    Destination: {
      ToAddresses: ["to@xxx.com"],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "https://www.uniqlo.com.hk/zh_HK/product-detail.html?productCode=u0000000020319",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "It is on sale!!",
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

module.exports = { sendEmail };

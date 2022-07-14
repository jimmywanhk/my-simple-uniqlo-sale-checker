const dotenv = require("dotenv").config();
const AWS = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = () => {
  let params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [process.env.EMAIL_TO],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: process.env.ITEM_URL,
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

const AWS = require("aws-sdk");
require("dotenv").config();
const tableName = process.env.USERS_TABLE;
const axios = require("axios");
const fs = require("fs");
const _ = require("lodash");

const user_exists_in_UsersTable = async (id) => {
  const DynamoDB = new AWS.DynamoDB.DocumentClient();

  console.log(`Looking for user [${id}] in table [${tableName}] `);
  const response = await DynamoDB.get({
    TableName: tableName,
    Key: {
      id,
    },
  }).promise();

  expect(response.Item).toBeTruthy();

  return response.Item;
};

const user_can_upload_image_to_url = async (url, filePath, contentType) => {
  try {
    const data = fs.readFileSync(filePath);

    const requestParams = {
      method: "PUT",
      url,
      headers: {
        "Content-Type": contentType,
      },
      data,
    };

    await axios(requestParams);

    console.log("Uploaded image to ", url);
  } catch (err) {
    console.log(
      "An error ocurred trying to uploda the image ",
      err.stack || err.message || err
    );
  }
};

const user_can_download_image_from = async (url) => {
  try {
    const resp = await axios(url);

    console.log("Downloaded image from ", url);

    return resp.data;
  } catch (err) {
    console.log(
      "An error ocurred trying to download the image",
      err.stack || err.message || err
    );
  }
};

module.exports = {
  user_exists_in_UsersTable,
  user_can_upload_image_to_url,
  user_can_download_image_from,
};

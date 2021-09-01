const AWS = require("aws-sdk");
require("dotenv").config();
const tableName = process.env.USERS_TABLE

const user_exists_in_UsersTable = async (id) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    console.log(`Looking for user [${id}] in table [${tableName}] `);
    const response = await DynamoDB.get({
        TableName: tableName,
        Key: {
         id   
        }
    }).promise();

    expect(response.Item).toBeTruthy();
    
    return response.Item;
}

module.exports ={
    user_exists_in_UsersTable
}
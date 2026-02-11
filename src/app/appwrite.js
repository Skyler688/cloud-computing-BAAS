// Note -> I had to use require to get node to see TablesDB, it would not work with import.
// However this may be do to me using a slightly older version of node, version(22.14.0)?
// Also don't see the need for typescript hear. So i am choosing to use just a js file.

const { Client, TablesDB, ID } = require("node-appwrite"); // Also i had to use "node-appwrite" to get TablesDB to work. Instead of just "appwrite".

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // keep this as your default endpoint.
  .setProject(process.env.APPWRITE_PROJECT_ID); // Your project ID

// Note -> Appwrite only allows for a sql based data base now in the free tier, so i had to change it according to the documentation.
const database = new TablesDB(client);
const databaseId = process.env.APPWRITE_DATABASE_ID;
const tableID = process.env.APPWRITE_TABLE_ID;

export { databaseId, tableID, client, database, ID };

const CosmosClient = require("@azure/cosmos").CosmosClient;
require('dotenv').config();
const dbContext = require("./databaseContext");

const newItem = {
  id: "4",
  name: "Henry",
  phone: "+84111111",
  department: "MCSD"
};

async function main() {

  try {
    // Read environment variables
    const endpoint = process.env.endpoint;
    const key = process.env.key;
    const databaseId = process.env.databaseId;
    const containerId = process.env.containerId;
    const partitionKey = process.env.partitionKey;
    // const { endpoint, key, databaseId, containerId } = config;

    console.log(`[endpoint]: ${JSON.stringify(endpoint)}`);
    console.log(`[key]: ${JSON.stringify(key)}`);
    console.log(`[databaseId]: ${JSON.stringify(databaseId)}`);
    console.log(`[containerId]: ${JSON.stringify(containerId)}`);
    console.log(`[partitionKey]: ${JSON.stringify(partitionKey)}`);

    // Initialize connection objects
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    
    // Make sure Tasks database is already setup. If not, create it.
    await dbContext.create(client, databaseId, containerId);

    console.log('Query container items------');
    const querySpec = {
      query: "SELECT * from c"
    };
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
      // .then((data) => {
      //   console.log(`data: ${JSON.stringify(data)}`);
      // });
      
    items.forEach(item => {
      console.log(`${item.id} - ${item.name} - ${item.phone} - ${item.department}`);
    });

    // console.log('Create new item------');
    // const { resource: createdItem } = await container.items.create(newItem);

  } catch (e) {
    console.log(`[Error]: ${e}`);
  }
}

main();

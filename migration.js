const MongoClient = require('mongodb').MongoClient;

const localMongoURI = 'mongodb://127.0.0.1:27017/cardz_galore'; // Replace with your local MongoDB URI
const atlasMongoURI = 'mongodb+srv://alexanderyanthar:1xXCDFWeGkrTOEEX@cluster0.si2erba.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas URI

let localClient;
let atlasClient;

async function migrateData() {
  try {
    // Connect to your local MongoDB
    const localClient = await MongoClient.connect(localMongoURI);

    // Connect to your MongoDB Atlas
    const atlasClient = await MongoClient.connect(atlasMongoURI);

    // Specify your local and Atlas databases and collections
    const localDb = localClient.db('cardz_galore');
    const atlasDb = atlasClient.db('cardz-galore');

    // Retrieve data from a local collection
    const localCollections = await localDb.listCollections().toArray();

    // Iterate through each collection and migrate data
    for (const collection of localCollections) {
      const collectionName = collection.name;
      const localData = await localDb.collection(collectionName).find({}).toArray();
      await atlasDb.collection(collectionName).insertMany(localData);
      console.log(`Data migrated from ${collectionName} collection.`);
    }

    console.log('Data migration completed.');
  } catch (error) {
    console.error('Data migration error:', error);
  } finally {
    // Close database connections
    if (localClient) {
      localClient.close();
    }
    if (atlasClient) {
      atlasClient.close();
    }
  }
}

// Call the migration function
migrateData();

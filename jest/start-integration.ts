import { MongoMemoryServer } from 'mongodb-memory-server';

async function getMongoDBInMemoryAndStartDB() {
  const mongoMemoryServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'teste',
    },
  });
  process.env.DATABASE_URI = mongoMemoryServer.getUri();

  (global as any).__MONGOINSTANCE = mongoMemoryServer;
}

export = async function globalSetup() {
  console.log('START INTEGRATION SETUP');
  await getMongoDBInMemoryAndStartDB();
};

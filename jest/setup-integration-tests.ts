import {
  bootstrapTest,
  dropDatabaseTest,
  seedDatabaseTest,
} from "../src/__tests__/testUtils";
import { IDatabase } from "../src/lib/db";
import { App } from "../src/app";

let dbInstance: IDatabase;
export let app: App;

beforeAll(async () => {
  const bootstrap = await bootstrapTest();
  dbInstance = bootstrap.dbInstance;
  app = bootstrap.app;
});

afterAll(async () => {
  await dbInstance?.close();
});

beforeEach(async () => {
  await seedDatabaseTest();
});

afterEach(async () => {
  await dropDatabaseTest();
});

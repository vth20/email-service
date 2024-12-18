import configs from "../config/config.ts";
import { MongoClient } from "deps";
import log from "../logger/index.ts";

const { dbName, mongoUrl } = configs;

/**
 * Reusable database connection
 */
class Database {
  public client: MongoClient;

  /**
   * Constructor function for Database
   * @param dbName
   * @param url
   */
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }

  /**
   * Function to connect to mongo db
   */
  async connect() {
    log.info(`MongoDB Server : ${mongoUrl} connecting...`);
    const client: MongoClient = new MongoClient();
    await client.connect(this.url);
    this.client = client;
    log.info("Database connected!");
  }

  /**
   * returns database
   */
  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const db = new Database(dbName, mongoUrl);
await db.connect();

export default db;

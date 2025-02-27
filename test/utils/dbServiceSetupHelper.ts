import {SqliteDBClient} from "../../src/shared/infrastructure/sqlite/sqliteDBClient";
import Injector from "../../src/shared/infrastructure/injector";
import {asValue} from "awilix";
import App from "../../src/shared/infrastructure/app";

export async function setupDatabaseService() {
    const dbClient = new SqliteDBClient({dbFile: ':memory:'})
    await dbClient.init() // Waiting for database setup: table creation, enabling foreign keys, etc.
    const db = dbClient.getDB()
    const injector = new Injector()
    injector.container.register({
        dbClient: asValue(dbClient)
    })
    const service = new App({injector})
    return { db, service }
}
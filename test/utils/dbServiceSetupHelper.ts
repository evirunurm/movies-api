import {DBClient} from "../../src/db/dbClient";
import Injector from "../../src/injector";
import {asValue} from "awilix";
import App from "../../src/app";

export async function setupDatabaseService() {
    const dbClient = new DBClient({dbFile: ':memory:'})
    await dbClient.init() // Waiting for database setup: table creation, enabling foreign keys, etc.
    const db = dbClient.getDB()
    const injector = new Injector()
    injector.container.register({
        dbClient: asValue(dbClient)
    })
    const service = new App({injector})
    return { db, service }
}
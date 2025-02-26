import {Database} from 'sqlite3';

export type DBClientDependencies = {
    dbFile: string
}

export interface IDBClient {
    init (): Promise<void>
    getDB (): Database
}
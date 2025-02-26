import request from 'supertest'
import App from "../../src/app";
import {asValue} from "awilix";
import Injector from "../../src/injector";
import {Database} from "sqlite3";
import {DBClient} from "../../src/db/dbClient";

describe('New-Releases Movies', () => {
    let service: App
    let injector: Injector
    let db: Database

    beforeEach(async () => {
        const dbClient = new DBClient({dbFile: ':memory:'})
        await dbClient.init() // Waiting for database setup: table creation, enabling foreign keys, etc.
        db = dbClient.getDB()
        injector = new Injector()
        injector.container.register({
            dbClient: asValue(dbClient)
        })
        service = new App({injector})
    })

    it('should return the correct body', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body if specified an order', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases?order=asc')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body and pagination if specified a pagination', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases?page=1&perPage=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
        expect(response.body.pagination.page).toBe(1)
        expect(response.body.pagination.perPage).toBe(5)
    })
})
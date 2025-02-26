import request from 'supertest'
import App from "../../src/app";
import {asValue} from "awilix";
import Injector from "../../src/injector";
import {Database} from "sqlite3";
import {DBClient} from "../../src/db/dbClient";
import {MovieMother} from "../builders/moviesMother";
import {DBSeeder} from "../../src/db/seeder/dbSeeder";

describe('Popular Movies', () => {
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
            .get('/api/movies/popular')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
    })

    it('should return the correct body if specified a limited amount of movies', async () => {
        const movies = Array.from({length: 5}, () => MovieMother.aMovie({}))
        await DBSeeder.seedMovies(db, movies)

        const response = await request(service.app)
            .get('/api/movies/popular?limit=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
        expect(response.body.data.length).toBe(5)
    })
})
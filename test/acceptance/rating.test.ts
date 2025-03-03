import request from 'supertest'
import App from "../../src/app/infrastructure/app";
import {Database} from "sqlite3";
import {DBSeeder} from "../../src/app/infrastructure/sqlite/dbSeeder";
import {setupDatabaseService} from "../utils/dbServiceSetupHelper";
import {MoviesListMother} from "../builders/moviesListMother";

describe('Top-Rated Movies', () => {
    let service: App
    let db: Database

    beforeEach(async () => {
        const {db: setupDB, service: setupService} = await setupDatabaseService()
        db = setupDB
        service = setupService
    })

    it('should return the correct body', async () => {
        const response = await request(service.app)
            .get('/api/movies/top-rated')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
    })

    it('should return the correct body if specified a limited amount of movies', async () => {
        const movies = MoviesListMother.aListOfMovies({length: 5})
        await DBSeeder.seedMovies(db, movies)

        const response = await request(service.app)
            .get('/api/movies/top-rated?limit=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
        expect(response.body.data.length).toBe(5)
    })
})
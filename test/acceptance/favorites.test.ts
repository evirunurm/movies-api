import request from 'supertest'
import App from '../../src/app/infrastructure/app'
import {DBSeeder} from "../../src/app/infrastructure/sqlite/dbSeeder";
import {User} from "../../src/favorites/domain/models/user";
import {Database} from "sqlite3";
import {MovieMother} from "../builders/movieMother";
import {setupDatabaseService} from "../utils/dbServiceSetupHelper";

describe('Favorite Movies', () => {
    let service: App
    let db: Database
    
    beforeEach(async () => {
        const {db: setupDB, service: setupService} = await setupDatabaseService()
        db = setupDB
        service = setupService
    })

    it('should return the correct status when successfully created for an existing user', async () => {
        await DBSeeder.seedUsers(db, [new User('name', 'email')])
        await DBSeeder.seedMovies(db, [MovieMother.aMovie({})])

        const response = await request(service.app)
            .post('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(201)
    })

    it('should return error status when movie id is not passed when creating movie for user', async () => {
        const response = await request(service.app)
            .post('/api/user/favorites')
            .send({userId: 1})

        expect(response.status).toEqual(400)
    })

    it('should return error status when user id is not passed when creating movie for user', async () => {
        const response = await request(service.app)
            .post('/api/user/favorites')
            .send({movieId: 1})

        expect(response.status).toEqual(400)
    })

    it('should return error status when creating movie for a non-existing user', async () => {
        const response = await request(service.app)
            .post('/api/user/favorites')
            .send({userId: 10, movieId: 1})

        expect(response.status).toEqual(404)
    })

    it('should successfully delete a favorite for an existing user', async () => {
        const response = await request(service.app)
            .delete('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(204)
    })

    it('should successfully get favorites for an existing user', async () => {
        const response = await request(service.app)
            .get('/api/user/favorites')
            .send({userId: 1})

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
    })
})
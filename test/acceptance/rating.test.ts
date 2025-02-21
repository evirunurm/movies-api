import request from 'supertest'
import app from '../../src/app'

describe('Top-Rated Movies', () => {
    // In this test, we are checking if the endpoint /api/movies/popular returns a valid object
    // with a property called results
    // For it to be a true Acceptance test, we would need to check if some
    // previously stored results are returned ordered by popularity.
    // I won't implement this yet because it would require a lot of setup
    // 1. Seeding the database with some movies
    // 2. Running tests in transactions, resetting the database after each test

    it('should return the correct body', async () => {
        const response = await request(app)
            .get('/api/movies/top-rated')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('results')
    })

    it('should return the correct body if specified a limited amount of movies', async () => {
        const response = await request(app)
            .get('/api/movies/top-rated?limit=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('results')
        expect(response.body.results.length).toBe(5)
    })
})
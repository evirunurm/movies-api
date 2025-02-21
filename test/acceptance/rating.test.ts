import request from 'supertest'
import app from '../../src/app'

describe('Top-Rated Movies', () => {
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
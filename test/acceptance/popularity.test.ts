import request from 'supertest'
import app from '../../src/app'

describe('Popular Movies', () => {


    it('should return a list of movies, ordered by popularity', async () => {
        const response = await request(app)
            .get('/api/movies/popular')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('results')
        expect(response.body.results.length).toBeGreaterThan(0)
        expect(response.body.results[0].popularity)
            .toBeGreaterThan(response.body.results[1].popularity)
    })
})
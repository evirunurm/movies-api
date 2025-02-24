import request from 'supertest'
import app from '../../src/app'

describe('Popular Movies', () => {
    it('should return the correct body', async () => {
        const response = await request(app)
            .get('/api/movies/popular')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
    })

    it('should return the correct body if specified a limited amount of movies', async () => {
        const response = await request(app)
            .get('/api/movies/popular?limit=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).not.toHaveProperty('pagination')
        expect(response.body.data.length).toBe(5)
    })
})
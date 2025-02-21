import request from 'supertest'
import app from '../../src/app'

describe('New Releases Movies', () => {
    it('should return the correct body', async () => {
        const response = await request(app)
            .get('/api/movies/new-releases')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body if specified an order', async () => {
        const response = await request(app)
            .get('/api/movies/new-releases?order=desc')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body if specified a pagination', async () => {
        const response = await request(app)
            .get('/api/movies/new-releases?page=1&perPage=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
        expect(response.body.pagination.page).toBe(1)
        expect(response.body.pagination.perPage).toBe(5)
    })
})
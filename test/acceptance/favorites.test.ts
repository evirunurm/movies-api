import request from 'supertest'
import app from '../../src/app'

describe('Favorite Movies', () => {
    it('should return the correct status when successfully created for an existing user', async () => {
        const response = await request(app)
            .post('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(201)
    })

    it('should successfully delete a favorite for an existing user', async () => {
        const response = await request(app)
            .delete('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(204)
        expect(response.body).toHaveProperty('data')
    })

    it('should successfully get favorites for an existing user', async () => {
        const response = await request(app)
            .get('/api/user/favorites')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
    })
})
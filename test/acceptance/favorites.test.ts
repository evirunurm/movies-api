import request from 'supertest'
import app from '../../src/app'

describe('Favorite Movies', () => {
    it('should return the correct status when successfully created for an existing user', async () => {
        const response = await request(app)
            .post('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(201)
    })

    it('should return error status when movie id is not passed when creating movie for user', async () => {
        const response = await request(app)
            .post('/api/user/favorites')
            .send({userId: 1})

        expect(response.status).toEqual(400)
    })

    it('should return error status when user id is not passed when creating movie for user', async () => {
        const response = await request(app)
            .post('/api/user/favorites')
            .send({movieId: 1})

        expect(response.status).toEqual(400)
    })

    it('should return error status when creating movie for a non-existing user', async () => {
        const response = await request(app)
            .post('/api/user/favorites')
            .send({userId: 10, movieId: 1})

        expect(response.status).toEqual(404)
    })

    it('should successfully delete a favorite for an existing user', async () => {
        const response = await request(app)
            .delete('/api/user/favorites')
            .send({userId: 1, movieId: 1})

        expect(response.status).toEqual(204)
    })

    it('should successfully get favorites for an existing user', async () => {
        const response = await request(app)
            .get('/api/user/favorites')
            .send({userId: 1})

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
    })
})
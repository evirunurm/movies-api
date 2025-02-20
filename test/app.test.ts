import request from 'supertest'
import app from '../src/app'

describe('Server', () => {
    it('should have a test endpoint that runs correctly', async () => {
        const res = await request(app).get("/api")

        expect(res.status).toEqual(200)
    })
})
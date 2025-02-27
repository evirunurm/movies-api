import request from 'supertest'
import App from "../../src/shared/infrastructure/app";
import {setupDatabaseService} from "../utils/dbServiceSetupHelper";

describe('New-Releases Movies', () => {
    let service: App

    beforeEach(async () => {
        const {service: setupService} = await setupDatabaseService()
        service = setupService
    })

    it('should return the correct body', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body if specified an order', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases?order=asc')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
    })

    it('should return the correct body and pagination if specified a pagination', async () => {
        const response = await request(service.app)
            .get('/api/movies/new-releases?page=1&perPage=5')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('pagination')
        expect(response.body.pagination.page).toBe(1)
        expect(response.body.pagination.perPage).toBe(5)
    })
})
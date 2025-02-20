import request from 'supertest'
import app from '../../src/app'

// Create a method to check the order of the movies?
// Will it be reused? Yes. I'll be testing movies ordered by popularity and rating, at least.
// Extend the expect function to check the order of the movies, passing a property to sort by.

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
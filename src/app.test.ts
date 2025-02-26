import request from 'supertest'
import App from "./app";
import {asValue} from "awilix";
import Injector from "./injector";

describe('Server', () => {
    let service: App;
    let injector: Injector

    beforeEach(async () => {
        injector = new Injector()
        injector.container.register({
            dbFile: asValue(':memory:')
        })
        service = new App({injector})
    })

    it('should have a test endpoint that runs correctly', async () => {
        const res = await request(service.app).get("/api")
        expect(res.status).toEqual(200)
    })
})
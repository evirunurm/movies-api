import express from 'express';
import {UsersController} from "./users.controller";

type UsersRouteDependencies = {
    usersController: UsersController
}

export default class UsersRoutes {
    private router = express.Router()
    private readonly usersController

    constructor({
        usersController
    }: UsersRouteDependencies) {
        this.usersController = usersController
        this.initializeRoutes()
    }

    public getRouter() {
        return this.router
    }

    private initializeRoutes() {
        this.router.post('/favorites', this.usersController.postFavoriteMovie.bind(this.usersController))
        this.router.delete('/favorites', this.usersController.deleteFavoriteMovie.bind(this.usersController))
        this.router.get('/favorites', this.usersController.getFavoriteMovies.bind(this.usersController))
    }
}
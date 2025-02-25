import express from 'express';
import {DBClient} from "../db/dbClient";
import {FavoritesRepository} from "../db/repositories/favories/favories.repository";
import {UsersFavoriteMoviesService} from "../services/users/favorites/usersFavoriteMovies.service";
import {UsersController} from "../controllers/users.controller";

class UsersRoutes {
    public router = express.Router()
    private db = new DBClient()
    private favoritesRepository = new FavoritesRepository(this.db.connect())
    private usersFavoriteMoviesService = new UsersFavoriteMoviesService(this.favoritesRepository)
    private usersController = new UsersController(this.usersFavoriteMoviesService)

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/favorites', this.usersController.postFavoriteMovie.bind(this.usersController))
        this.router.delete('/favorites', this.usersController.deleteFavoriteMovie.bind(this.usersController))
        this.router.get('/favorites', this.usersController.getFavoriteMovies.bind(this.usersController))
    }
}

export default new UsersRoutes().router;
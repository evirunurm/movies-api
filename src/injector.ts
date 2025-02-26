import {asClass, asValue, AwilixContainer, createContainer} from "awilix";
import {DBClient} from "./db/dbClient";
import UsersRoutes from "./routes/users.routes";
import MoviesRoutes from "./routes/movies.routes";
import {UsersController} from "./controllers/users.controller";
import {MoviesController} from "./controllers/movies.controller";
import {MoviesRepository} from "./db/repositories/movies/movies.repository";
import {FavoritesRepository} from "./db/repositories/favories/favorites.repository";
import {FavoriteMoviesService} from "./services/users/favorites/favoriteMovies.service";
import {NewReleasesService} from "./services/movies/newReleases/newReleases.service";
import {PopularityService} from "./services/movies/popularity/popularity.service";
import {RatingService} from "./services/movies/rating/rating.service";
require('dotenv').config()

export default class Injector {
    public container: AwilixContainer = createContainer()

    constructor() {
        this.initialize()
    }

    private initialize() {
        const { SQLITE_DB_CONNECT } = process.env
        this.container.register({
            dbFile: asValue(SQLITE_DB_CONNECT),
            dbClient: asClass(DBClient).singleton(),
            usersRoutes: asClass(UsersRoutes).singleton(),
            moviesRoutes: asClass(MoviesRoutes).singleton(),
            usersController: asClass(UsersController).singleton(),
            moviesController: asClass(MoviesController).singleton(),
            moviesRepository: asClass(MoviesRepository).singleton(),
            favoritesRepository: asClass(FavoritesRepository).singleton(),
            favoriteMoviesService: asClass(FavoriteMoviesService).singleton(),
            newReleasesService: asClass(NewReleasesService).singleton(),
            popularMoviesService: asClass(PopularityService).singleton(),
            ratingService: asClass(RatingService).singleton(),
            container: asValue(this.container)
        })
    }
}
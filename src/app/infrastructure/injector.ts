import {asClass, asValue, AwilixContainer, createContainer} from "awilix";
import {SqliteDBClient} from "./sqlite/sqliteDBClient";
import UsersRoutes from "../../favorites/infrastructure/users.routes";
import MoviesRoutes from "../../movies/infrastructure/movies.routes";
import {UsersController} from "../../favorites/infrastructure/users.controller";
import {MoviesController} from "../../movies/infrastructure/movies.controller";
import {SqliteMoviesRepository} from "../../movies/infrastructure/repositories/sqliteMovies.repository";
import {SqliteFavoritesRepository} from "../../favorites/infrastructure/repositories/sqliteFavorites.repository";
import {FavoriteMoviesService} from "../../favorites/application/favoriteMovies.service";
import {NewReleasesService} from "../../movies/application/newReleases/newReleases.service";
import {PopularityService} from "../../movies/application/popularity/popularity.service";
import {RatingService} from "../../movies/application/rating/rating.service";
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
            dbClient: asClass(SqliteDBClient).singleton(),
            usersRoutes: asClass(UsersRoutes).singleton(),
            moviesRoutes: asClass(MoviesRoutes).singleton(),
            usersController: asClass(UsersController).singleton(),
            moviesController: asClass(MoviesController).singleton(),
            moviesRepository: asClass(SqliteMoviesRepository).singleton(),
            favoritesRepository: asClass(SqliteFavoritesRepository).singleton(),
            favoriteMoviesService: asClass(FavoriteMoviesService).singleton(),
            newReleasesService: asClass(NewReleasesService).singleton(),
            popularMoviesService: asClass(PopularityService).singleton(),
            ratingService: asClass(RatingService).singleton(),
            container: asValue(this.container)
        })
    }
}
import express from 'express';
import MoviesRoutes from './routes/movies.routes';
import GlobalRoutes from './routes/routes';
import UsersRoutes from './routes/users.routes';
import {UsersController} from "./controllers/users.controller";
import {asClass, asValue, AwilixContainer, createContainer} from "awilix";
import {MoviesController} from "./controllers/movies.controller";
import {DBClient} from "./db/dbClient";
import {MoviesRepository} from "./db/repositories/movies/movies.repository";
import {FavoriteMoviesService} from "./services/users/favorites/favoriteMovies.service";
import {NewReleasesService} from "./services/movies/newReleases/newReleases.service";
import {FavoritesRepository} from "./db/repositories/favories/favories.repository";
import {PopularityService} from "./services/movies/popularity/popularity.service";
import {RatingService} from "./services/movies/rating/rating.service";

class App {
    // TODO: Set APP as private,
    //  export the class and instanciate in each acceptance test?
    public app: express.Application;
    // TODO: Move PORT to .env
    private readonly PORT: number = 3000;
    private container: AwilixContainer = createContainer();

    constructor () {
        this.app = express()
        this.initializeMiddlewares()
        this.initializeContainer()
        this.initializeRoutes()
        this.startServer()
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
    }

    private initializeContainer() {
        // TODO: const { SQLITE_DB_CONNECT } = process.env;
        this.container.register({
            dbFile: asValue('db.sqlite'),
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
            ratingService: asClass(RatingService).singleton()
        });
    }

    private initializeRoutes() {
        this.app.use('/api', new GlobalRoutes().getRouter())
        this.app.use('/api/movies', this.container.resolve('moviesRoutes').getRouter())
        this.app.use('/api/user', this.container.resolve('usersRoutes').getRouter())
    }

    private startServer() {
        if (process.env.NODE_ENV !== 'test') {
            this.app.listen(this.PORT, () => console.log(`Listening on port ${this.PORT}`))
        }
    }
}

export default new App().app;
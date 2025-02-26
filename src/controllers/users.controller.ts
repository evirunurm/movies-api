import {Request, Response} from 'express';
import {FavoriteMoviesService} from "../services/users/favorites/favoriteMovies.service";
import {MoviesView} from "../domain/view/movies.view";

type UsersControllerDependencies = {
    favoriteMoviesService: FavoriteMoviesService
}

export class UsersController {
    private readonly favoriteMoviesService

    constructor( {favoriteMoviesService}: UsersControllerDependencies) {
        this.favoriteMoviesService = favoriteMoviesService
    }

    public async postFavoriteMovie(req: Request, res: Response) {
        if (!req.body.userId || !req.body.movieId) {
            res.status(400).send({error: 'userId and movieId are required'})
            return
        }
        await this.favoriteMoviesService.post({
            userId: req.body.userId,
            movieId: req.body.movieId
        })
        res.status(201).send()
    }

    public async deleteFavoriteMovie(req: Request, res: Response) {
        if (!req.body.userId || !req.body.movieId) {
            res.status(400).send({error: 'userId and movieId are required'})
            return
        }
        await this.favoriteMoviesService.delete({
            userId: req.body.userId,
            movieId: req.body.movieId
        })
        res.status(204).send()
    }

    public async getFavoriteMovies(req: Request, res: Response) {
        if (!req.body.userId) {
            res.status(400).send({error: 'userId is required'})
            return
        }
        const favorites = await this.favoriteMoviesService.getAllForUser(
            req.body.userId
        )
        res.status(200).send(new MoviesView(favorites))
    }
}

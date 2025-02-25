import {Request, Response} from 'express';
import {UsersFavoriteMoviesService} from "../services/users/favorites/usersFavoriteMovies.service";

export class UsersController {

    constructor(
        private usersFavoriteMoviesService: UsersFavoriteMoviesService,
    ) {}

    public async postFavoriteMovie(req: Request, res: Response) {
        const id = await this.usersFavoriteMoviesService.post({
            userId: req.body.userId,
            movieId: req.body.movieId
        })
        res.status(201).send({id})
    }

    public async deleteFavoriteMovie(req: Request, res: Response) {
        await this.usersFavoriteMoviesService.delete({
            userId: req.body.userId,
            movieId: req.body.movieId
        })
        res.status(204).send()
    }

    public async getFavoriteMovies(req: Request, res: Response) {

    }
}

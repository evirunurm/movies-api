import {Request, Response} from 'express';
import {MoviesView} from "../../movies/domain/movies.view";
import {ElementNotFoundError} from "../domain/elementNotFoundError";
import {FavoriteMoviesService} from "../application/favoriteMovies.service";
import {ElementAlreadyExistsError} from "../domain/elementAlreadyExistsError";

type UsersControllerDependencies = {
    favoriteMoviesService: FavoriteMoviesService
}

export class UsersController {
    private readonly invalidBodyMessage = 'The request body is not valid'
    private readonly favoriteMoviesService

    constructor( {favoriteMoviesService}: UsersControllerDependencies) {
        this.favoriteMoviesService = favoriteMoviesService
    }

    public async postFavoriteMovie(req: Request, res: Response) {
        if (!this.isValidCommandRequest(req)) {
            res.status(400).send({error: this.invalidBodyMessage})
            return
        }

        try {
            await this.favoriteMoviesService.post({
                userId: req.body.userId,
                movieId: req.body.movieId
            })
        } catch (error) {
            if (error instanceof ElementNotFoundError) {
                res.status(404).send(error.message)
                return
            }
            if (error instanceof ElementAlreadyExistsError) {
                res.status(403).send(error.message)
                return
            }
        }
        res.status(201).send()
    }

    public async deleteFavoriteMovie(req: Request, res: Response) {
        if (!this.isValidCommandRequest(req)) {
            res.status(400).send({error: this.invalidBodyMessage})
            return
        }

        await this.favoriteMoviesService.delete({
            userId: req.body.userId,
            movieId: req.body.movieId
        })
        res.status(204).send()
    }

    public async getFavoriteMovies(req: Request, res: Response) {
        if (!this.isValidQueryRequest(req)) {
            res.status(400).send({error: this.invalidBodyMessage})
            return
        }
        
        const favorites = await this.favoriteMoviesService.getAllForUser(req.body.userId)
        res.status(200).send(new MoviesView(favorites))
    }

    private isValidCommandRequest = (req: Request) =>
        req.body.userId && req.body.movieId

    private isValidQueryRequest = (req: Request) =>
        req.body.userId
}

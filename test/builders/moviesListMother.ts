import Movie from "../../src/movies/domain/models/movie";
import {MovieMother} from "./movieMother";

type MoviesListConfiguration = {
    length: number
}

export class MoviesListMother {

    public static aListOfMovies({
        length
    }: MoviesListConfiguration): Movie[] {
        return Array.from({length}, (_, nameIdentifier) =>{
            return MovieMother.aMovie({nameIdentifier})
        })
    }

    public static aListOfMoviesWithDifferentRatings({
        length
    }: MoviesListConfiguration): Movie[] {
        return Array.from({length}, (_, nameIdentifier) =>{
            return MovieMother.aMovie({
                nameIdentifier,
                rating: nameIdentifier
            })
        })
    }

    public static aListOfMoviesWithDifferentPopularity({
        length
    }: MoviesListConfiguration): Movie[] {
        return Array.from({length}, (_, nameIdentifier) =>{
            return MovieMother.aMovie({
                nameIdentifier,
                popularity: nameIdentifier
            })
        })
    }

    public static aListOfNotReleasedMoviesWithDifferentYears({
                                    length
                                }: MoviesListConfiguration): Movie[] {
        return Array.from({length}, (_, nameIdentifier) =>{
            const today = new Date()
            return MovieMother.aMovie({
                nameIdentifier,
                releaseDate: new Date(
                    today.getFullYear() + nameIdentifier,
                    today.getMonth(),
                    today.getDate())
            })
        })
    }
}
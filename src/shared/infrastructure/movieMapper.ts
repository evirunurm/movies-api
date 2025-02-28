import Movie from "../../movies/domain/models/movie";

export class MovieMapper {
    static RowToMovie(row: any): Movie {
        return new Movie(
            row.title,
            new Date(row.release_date),
            row.popularity,
            row.rating,
            row.id
        )
    }
}
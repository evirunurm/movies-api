
import {Database} from "sqlite3";
import {NewReleasesService} from "./newReleases.service";
import {MoviesRepository} from "../../db/repositories/movies.repository";
import {MovieMother} from "../../../test/builders/moviesMother";

describe('New Releases Service', () => {
    let newReleasesService: NewReleasesService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        // Instead of an actual instance of database
        // We use a Dummy whose only purpose is to satisfy the dependency
        // It's never going to get called
        const db = jest.fn() as unknown as Database
        moviesRepository = new MoviesRepository(db)
        newReleasesService = new NewReleasesService(moviesRepository)
    })

    it('should get not yet released movies ordered by release date in descending order by default', async () => {
        const amountNewReleases = 5
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: amountNewReleases}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(releaseDate.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }).sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime())
        )

        const newReleases = (await newReleasesService.get()).data

        expect(newReleases.length).toBe(amountNewReleases)
        expect(newReleases[0].title).toBe('Movie 4')
        expect(newReleases[newReleases.length - 1].title).toBe('Movie 0')
    })

    it('should get not yet released movies ordered by release date in ascending order', async () => {
        const amountNewReleases = 5
        const today = new Date()
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: amountNewReleases}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const newReleases = (await newReleasesService.get(true)).data

        expect(newReleases.length).toBe(amountNewReleases)
        expect(newReleases[0].title).toBe('Movie 0')
        expect(newReleases[newReleases.length - 1].title).toBe('Movie 4')
    })

    it('should get paginated not yet released movies by default at page 1, with a limit of 10', async () => {
        const today = new Date()
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: 15}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const result = await newReleasesService.get()

        expect(result.pagination.page).toBe(1)
        expect(result.pagination.perPage).toBe(10)
        expect(result.pagination.total).toBe(0)
    })
})
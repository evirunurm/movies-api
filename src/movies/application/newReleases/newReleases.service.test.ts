import {NewReleasesService} from "./newReleases.service";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";
import {MoviesListMother} from "../../../../test/builders/moviesListMother";

describe('New Releases Service', () => {
    let newReleasesService: NewReleasesService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = {} as MoviesRepository
        newReleasesService = new NewReleasesService({moviesRepository})
    })

    it('should get correct pagination if nothing is specified', async () => {
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(20)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(() =>
            MoviesListMother.aListOfMovies({length: 20})
        )

        const result = await newReleasesService.get({})

        expect(result.pagination.page).toBe(1)
        expect(result.pagination.perPage).toBe(10)
        expect(result.pagination.total).toBe(20)
    })

    it('should get correct pagination if specified', async () => {
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(10)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(() =>
            MoviesListMother.aListOfMovies({length: 10})
        )

        const result = await newReleasesService.get({
            page: 2,
            perPage: 5
        })

        expect(result.pagination.page).toBe(2)
        expect(result.pagination.perPage).toBe(5)
        expect(result.pagination.total).toBe(10)
    })

    it('should get correct pagination when there are less elements than a single page size', async () => {
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(3)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(() =>
            MoviesListMother.aListOfMovies({length: 3})
        )

        const result = await newReleasesService.get({
            page: 1,
            perPage: 5
        })

        expect(result.pagination.page).toBe(1)
        expect(result.pagination.perPage).toBe(5)
        expect(result.pagination.total).toBe(3)
    })

    it('should get correct pagination when viewing a page with no elements', async () => {
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(6)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(() =>
            MoviesListMother.aListOfMovies({length: 6})
        )

        const result = await newReleasesService.get({
            page: 3,
            perPage: 3
        })

        expect(result.pagination.page).toBe(3)
        expect(result.pagination.perPage).toBe(3)
        expect(result.pagination.total).toBe(6)
    })
})
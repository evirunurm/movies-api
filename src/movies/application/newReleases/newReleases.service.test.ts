import {NewReleasesService} from "./newReleases.service";
import {MovieMother} from "../../../../test/builders/moviesMother";
import {MoviesRepository} from "../../../favorites/domain/ports/movies.repository";

describe('New Releases Service', () => {
    let newReleasesService: NewReleasesService
    let moviesRepository: MoviesRepository

    beforeEach(() => {
        moviesRepository = {} as MoviesRepository
        newReleasesService = new NewReleasesService({moviesRepository})
    })

    it('should get correct pagination if nothing is specified', async () => {
        const today = new Date()
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(20)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: 10}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const result = await newReleasesService.get({})

        expect(result.pagination.page).toBe(1)
        expect(result.pagination.perPage).toBe(10)
        expect(result.pagination.total).toBe(20)
    })

    it('should get correct pagination if specified', async () => {
        const today = new Date()
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(10)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: 10}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const result = await newReleasesService.get({
            page: 2,
            perPage: 5
        })

        expect(result.pagination.page).toBe(2)
        expect(result.pagination.perPage).toBe(5)
        expect(result.pagination.total).toBe(10)
    })

    it('should get correct pagination when there are less elements than a single page size', async () => {
        const today = new Date()
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(3)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: 3}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const result = await newReleasesService.get({
            page: 1,
            perPage: 5
        })

        expect(result.pagination.page).toBe(1)
        expect(result.pagination.perPage).toBe(5)
        expect(result.pagination.total).toBe(3)
    })

    it('should get correct pagination when viewing a page with no elements', async () => {
        const today = new Date()
        moviesRepository.getCountNewReleases = jest.fn().mockResolvedValue(6)
        moviesRepository.getNewReleasesPaginated = jest.fn().mockResolvedValue(
            Array.from({length: 6}, (_, index) => {
                const releaseDate = new Date()
                releaseDate.setDate(today.getDate() + index + 1)
                return MovieMother.aMovie({
                    nameIdentifier: index,
                    releaseDate
                })
            }))

        const result = await newReleasesService.get({
            page: 3,
            perPage: 3
        })

        expect(result.pagination.page).toBe(3)
        expect(result.pagination.perPage).toBe(3)
        expect(result.pagination.total).toBe(6)
    })
})
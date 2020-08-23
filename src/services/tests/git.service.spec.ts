import { mockRepos } from '@/services/tests/fixtures/repo.data'
import { Test } from '@nestjs/testing'
import { HttpService } from '@nestjs/common'
import { GitService } from '@/services/git.service'
import { AxiosResponse } from 'Axios'
import { of } from 'rxjs'
import { RepositoryDto } from '@/services/dtos/repository.dto'
import { mockBranchData } from '@/services/tests/fixtures/branch.data'
import { BranchDto } from '@/services/dtos/branch.dto'

describe('Git service', () => {

    let gitService: GitService
    let httpService: HttpService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: HttpService,
                    useFactory: () => ({
                        get: jest.fn()
                    })
                }, GitService
            ]
        }).compile()

        httpService = moduleRef.get<HttpService>(HttpService)
        gitService = moduleRef.get<GitService>(GitService)
    })

    it('should return a users repositories', async () => {
        const mockHttpResponse: AxiosResponse = {
            config: undefined,
            data: mockRepos,
            headers: undefined,
            status: 200,
            statusText: ''
        }
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mockHttpResponse))
        const response: RepositoryDto[] = await gitService.getUsersRepositories('test@user.com')

        expect(httpService.get).toBeCalledTimes(1)
        expect(httpService.get).toBeCalledWith('/users/test@user.com/repos',
            { headers: { 'Content-Type': 'application/vnd.github.v3+json' }, baseURL: 'https://api.github.com' })
        expect(response).toBe(mockRepos)
    })

    it('should return a 404 if user repository not found', async () => {
        const mockHttpResponse: AxiosResponse = {
            config: undefined,
            data: undefined,
            headers: undefined,
            status: 404,
            statusText: ''
        }
        jest.spyOn(httpService, 'get').mockImplementation(() => of(mockHttpResponse))
        try {
            await gitService.getUsersRepositories('unknown-test@user.com')
        } catch (e) {
            expect(e.status).toBe(404)
            expect(e.message).toBe('User not found')
        }

        expect(httpService.get).toBeCalledTimes(1)
        expect(httpService.get).toBeCalledWith('/users/unknown-test@user.com/repos',
            { headers: { 'Content-Type': 'application/vnd.github.v3+json' }, baseURL: 'https://api.github.com' })
    })

    it('should return a list of branches for a repository', async () => {
        const mockHttpResponse: AxiosResponse = {
            config: undefined,
            data: mockBranchData,
            headers: undefined,
            status: 200,
            statusText: ''
        }
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mockHttpResponse))
        const response: BranchDto[] = await gitService.getRepositoryBranches('test-user', 'test-repo')
        expect(httpService.get).toBeCalledTimes(1)
        expect(httpService.get).toBeCalledWith('/repos/test-user/test-repo/branches',
            { headers: { 'Content-Type': 'application/vnd.github.v3+json' }, baseURL: 'https://api.github.com' })
        expect(response).toBe(mockBranchData)
    })

    it('should return no branches if HTTP response is 404', async () => {
        const mockHttpResponse: AxiosResponse = {
            config: undefined,
            data: undefined,
            headers: undefined,
            status: 404,
            statusText: ''
        }
        jest.spyOn(httpService, 'get').mockImplementation(() => of(mockHttpResponse))
        const response: BranchDto[] = await gitService.getRepositoryBranches('test-user', 'test-repo')
        expect(httpService.get).toBeCalledTimes(1)
        expect(httpService.get).toBeCalledWith('/repos/test-user/test-repo/branches',
            { headers: { 'Content-Type': 'application/vnd.github.v3+json' }, baseURL: 'https://api.github.com' })
        expect(response).toEqual([])
    })
})

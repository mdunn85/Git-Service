import { GitService } from '@/services/git.service'
import { RepositoriesController } from '@/repositories/repositories.controller'
import { Test } from '@nestjs/testing'
import { mockRepos } from '@/services/tests/fixtures/repo.data'
import { HttpStatus } from '@nestjs/common'
import { mockBranchData } from '@/services/tests/fixtures/branch.data'

describe('Repositories controller', () => {

    let repositoriesController: RepositoriesController
    let gitService: GitService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ RepositoriesController ],
            providers: [ {
                provide: GitService,
                useFactory: () => ({
                    getUsersRepositories: jest.fn(),
                    getRepositoryBranches: jest.fn()
                })
            } ]
        }).compile()

        gitService = moduleRef.get<GitService>(GitService)
        repositoriesController = moduleRef.get<RepositoriesController>(RepositoriesController)
    })

    it('should have a 404 response when user not found', async () => {
        jest.spyOn(gitService, 'getUsersRepositories').mockRejectedValue({
            status: 404
        })
        try {
            await repositoriesController.getUsersRepositories('test-user')
        } catch (e) {
            expect(e.status).toBe(HttpStatus.NOT_FOUND)
            expect(gitService.getUsersRepositories).toBeCalledTimes(1)
            expect(gitService.getUsersRepositories).toBeCalledWith('test-user')
        }
    })

    it('should return repositories without forks', async () => {
        jest.spyOn(gitService, 'getUsersRepositories').mockResolvedValue(mockRepos)
        jest.spyOn(gitService, 'getRepositoryBranches').mockResolvedValue(mockBranchData)
        const response = await repositoriesController.getUsersRepositories('test-user')
        expect(response).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    name: 'c-sharp-examples'
                })
            ])
        )
    })

    it('should return repositories and its branches', async () => {
        jest.spyOn(gitService, 'getUsersRepositories').mockResolvedValue(mockRepos)
        jest.spyOn(gitService, 'getRepositoryBranches').mockResolvedValue(mockBranchData)
        const response = await repositoriesController.getUsersRepositories('test-user')
        expect(gitService.getUsersRepositories).toBeCalledTimes(1)
        expect(gitService.getRepositoryBranches).toBeCalledTimes(response.length)
        expect(response.length).toBe(mockRepos.length - 1)
        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'android-wahoo-library'
                })
            ])
        )
        expect(response[0].branches[0]).toEqual({
            name: 'master',
            sha: 'c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc'
        })
    })


})

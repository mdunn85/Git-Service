import { Controller, Get, Param } from '@nestjs/common'
import { GitService } from '@/services/git.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { RepositoryWithBranchesDto } from '@/repositories/dtos/repository-with-branches.dto'
import { BranchDto } from '@/services/dtos/branch.dto'
import { RepositoryDto } from '@/services/dtos/repository.dto'


@Controller('repositories')
export class RepositoriesController {
    constructor(private readonly gitService: GitService) {
    }

    /**
     * Gets a users repositories with their branches
     */
    @Get('users/:user')
    @ApiOperation({
        description: 'Gets a users repositories with branches'
    })
    @ApiResponse({
        description: 'An array of repositories with branches',
        status: 200,
        type: [ RepositoryWithBranchesDto ]
    })
    async getUsersRepositories(@Param('user') username: string): Promise<RepositoryWithBranchesDto[]> {
        // Get the repository from Github
        const repos: RepositoryDto[] = await this.gitService.getUsersRepositories(username)

        // Remove repositories that are forks
        const reposWithoutForks: RepositoryDto[] = repos.filter(repo => !repo.fork)

        return await this.getRepositoryBranches(reposWithoutForks)
    }

    /**
     * Transform repositories into repositoryWithBranches objects
     * @param repositories
     */
    async getRepositoryBranches(repositories: RepositoryDto[]): Promise<RepositoryWithBranchesDto[]> {
        return await Promise.all(repositories.map(async (repo) => {
            const repositoryWithBranches: RepositoryWithBranchesDto = new RepositoryWithBranchesDto(repo)
            // Get the repository branches for Github
            const branches: BranchDto[] = await this.gitService.getRepositoryBranches(repo.owner.login, repo.name)
            // Add the branches to repositoryWithBranches object
            repositoryWithBranches.addBranches(branches)
            return repositoryWithBranches
        }))
    }
}

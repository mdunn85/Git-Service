import { RepositoryDto } from '@/services/dtos/repository.dto'
import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common'
import { AxiosRequestConfig } from 'Axios'
import { BranchDto } from '@/services/dtos/branch.dto'

@Injectable()
export class GitService {

    serviceHttpConfig: AxiosRequestConfig

    constructor(private readonly httpService: HttpService) {
        this.serviceHttpConfig = {
            headers: {
                'Content-Type': 'application/vnd.github.v3+json'
            },
            baseURL: 'https://api.github.com'
        }
    }

    /**
     * Gets a users repositories
     * https://docs.github.com/en/rest/reference/repos#get-a-repository
     * @param username
     */
    async getUsersRepositories(username: string): Promise<RepositoryDto[]> {
        const response = await this.httpService.get(`/users/${ username }/repos`, this.serviceHttpConfig)
            .toPromise()
        if (response.status === HttpStatus.NOT_FOUND) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return response.data
    }

    /**
     * Gets a repository branches
     * https://docs.github.com/en/rest/reference/repos#list-branches
     * @param username
     * @param repository
     */
    async getRepositoryBranches(username: string, repository: string): Promise<BranchDto[]> {
        const response = await this.httpService.get(`/repos/${ username }/${ repository }/branches`, this.serviceHttpConfig)
            .toPromise()
        if (response.status === HttpStatus.NOT_FOUND) {
            return []
        }
        return response.data
    }
}

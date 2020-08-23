import { RepositoryDto } from '@/services/dtos/repository.dto'
import { RepositoryBranchesDto } from '@/repositories/dtos/repository-branches.dto'
import { BranchDto } from '@/services/dtos/branch.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RepositoryWithBranchesDto {
    @ApiProperty({
        type: String,
        description: 'Name of the repository'
    })
    name: string

    @ApiProperty({
        type: String,
        description: 'Owner of the repository'
    })
    owner: string

    @ApiProperty({
        type: [ RepositoryBranchesDto ],
        description: 'Branches of the repository'
    })
    branches: RepositoryBranchesDto[]

    constructor(repository: RepositoryDto) {
        this.name = repository.name
        this.owner = repository.owner.login
        this.branches = []
    }

    addBranches(branches: BranchDto[]): void {
        branches.forEach((branch) => {
            this.branches.push({
                name: branch.name,
                sha: branch.commit.sha
            })
        })
    }
}

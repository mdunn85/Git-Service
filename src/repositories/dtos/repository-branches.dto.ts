import { ApiProperty } from '@nestjs/swagger'

export class RepositoryBranchesDto {
    @ApiProperty({
        type: String,
        description: 'Name of the branch'
    })
    name: string

    @ApiProperty({
        type: String,
        description: 'Last commit sha'
    })
    sha: string
}

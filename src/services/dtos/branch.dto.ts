import { CommitDto } from '@/services/dtos/commit.dto'
import { ProtectionDto } from '@/services/dtos/protection.dto'

export interface BranchDto {
    name: string
    commit: CommitDto
    protected: boolean
    protection: ProtectionDto
    protection_url: string
}

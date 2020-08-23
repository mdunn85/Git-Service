import { RequiredStatusChecksDto } from '@/services/dtos/required-status-checks.dto'

export interface ProtectionDto {
    enabled: boolean
    required_status_checks: RequiredStatusChecksDto
}

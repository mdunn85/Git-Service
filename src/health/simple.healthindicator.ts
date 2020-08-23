import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SimpleHealthIndicator extends HealthIndicator {
    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        return this.getStatus(key, true, { name: 'app' })
    }
}

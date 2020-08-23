import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck, HealthCheckResult } from '@nestjs/terminus'
import { SimpleHealthIndicator } from './simple.healthindicator'
import { ApiOperation } from '@nestjs/swagger'

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthCheckService,
        private readonly simpleHealthIndicator: SimpleHealthIndicator
    ) {
    }

    @Get()
    @HealthCheck()
    @ApiOperation({
        description: 'Checks if the service is healthy'
    })
    async check(): Promise<HealthCheckResult> {
        return await this.healthService.check([
            async () => await this.simpleHealthIndicator.isHealthy('app')
        ])
    }
}

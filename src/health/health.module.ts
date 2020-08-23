import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { SimpleHealthIndicator } from './simple.healthindicator'
import { TerminusModule } from '@nestjs/terminus'

@Module({
    imports: [ TerminusModule ],
    controllers: [ HealthController ],
    providers: [ SimpleHealthIndicator ]
})

export class HealthModule {
}

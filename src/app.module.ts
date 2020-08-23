import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { RepositoriesModule } from '@/repositories/repositories.module'

@Module({
    imports: [
        HealthModule,
        RepositoriesModule
    ]
})
export class AppModule {
}

import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { RepositoriesController } from '@/repositories/repositories.controller'
import { GitService } from '@/services/git.service'
import { RequestHeaderAcceptMiddleware } from '@/middlewares/request-header-accept.middleware'

@Module({
    imports: [ HttpModule.register({})],
    providers: [ GitService ],
    controllers: [ RepositoriesController ]
})

export class RepositoriesModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(RequestHeaderAcceptMiddleware)
            .forRoutes('repositories');
    }
}

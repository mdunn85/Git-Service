import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { HealthModule } from '../health.module'
import * as request from 'supertest'

describe('Health Controller', () => {
    let app: INestApplication

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ HealthModule ]
        }).compile()

        app = module.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('GET /health', () => {
        it('should return status ok', async function () {
            const response = await request(app.getHttpServer())
                .get('/health')
                .send()

            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body.status).toBe('ok')
            expect(response.body.info.app.status).toBe('up')
        })
    })
})

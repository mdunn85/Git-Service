import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common'

export class RequestHeaderAcceptMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any {
        const acceptHeader = req.get('Accept')
        if (acceptHeader !== 'application/json') {
            throw new HttpException(
                'Wrong Accept in header must be application/json',
                HttpStatus.NOT_ACCEPTABLE
            )
        }
        next()
    }
}

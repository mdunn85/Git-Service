import { EventEmitter } from 'events'
import { RequestHeaderAcceptMiddleware } from '@/middlewares/request-header-accept.middleware'


describe('Request headers middleware', () => {
    const mockNext = jest.fn()
    const requestHeaderAcceptMiddleware: RequestHeaderAcceptMiddleware
        = new RequestHeaderAcceptMiddleware()

    const request = Object.create(EventEmitter.prototype)
    request.get = jest.fn().mockImplementation(() => request.headers.Accept)

    it('should throw a HTTP 406 error with wrong Accept header', () => {
        request.headers = {
            Accept: 'application/xml'
        }
        try {
            requestHeaderAcceptMiddleware.use(request, null, mockNext)
        } catch (e) {
            expect(e.status).toBe(406)
            expect(e.message).toBe('Wrong Accept in header must be application/json')
        }
    })

    it('should not throw an error when Accept header is application/json', () => {
        request.headers = {
            Accept: 'application/json'
        }
        requestHeaderAcceptMiddleware.use(request, null, mockNext)
        expect(mockNext).toBeCalledTimes(1)
    })
})

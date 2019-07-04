
import { __ErrorCode, __ErrorMessage, CustomError, ErrorInfo } from './error'
import { IError, IErrorInfo } from '../types'

let error: IError

describe('Error', () => {

  beforeAll( () => {
    error = <IError> ErrorInfo(__ErrorCode.ERROR_AUTH_FLAG_ACCESS)
  })

  test('ErrorInfo -> code', () => {
    expect(error.code).toBe(__ErrorCode.ERROR_AUTH_FLAG_ACCESS)
  })

  test('ErrorInfo -> message', () => {
    expect(error.message).toBe(__ErrorMessage.ERROR_AUTH_FLAG_ACCESS)
  })

  test('ErrorInfo -> json', () => {
    let _error: IErrorInfo = <IErrorInfo> ErrorInfo(__ErrorCode.ERROR_AUTH_FLAG_ACCESS, null, true)
    expect(_error).toMatchObject({
      code: 1001,
      message: '没有访问该页面的权限'
    })
  })

  test('CustomError -> true', () => {
    expect(CustomError(error)).toBe(true)
  })

})

import * as util from 'util'
import { IError, IErrorInfo, Maps, IErrorState } from '../types'

/**
 * 错误处理
 * @param __ErrorCode Maps<number>
 * @param __ErrorMessage Maps<string>
 * @param start number
 */
export function useError (__ErrorCode: Maps<number>, __ErrorMessage: Maps<string>, start: number = 1000): IErrorState {
  
  let CustomError = (e: IError): boolean | 0 | undefined => e.code && e.code >= start

  let ErrorInfo = (code: number, opts?: any, json?: boolean): IErrorInfo | IError => {
    let info: IErrorInfo = { code }
    for (let e in __ErrorCode) {
      if (__ErrorCode[e] === code) {
        info.message = __ErrorMessage[e]
        break
      }
    }
    if (Array.isArray(opts)) {
      opts.splice(0, 0, info.message)
      info.message = util.format(opts[0], ...opts.slice(1))
    }
    if (json) return info
    let error: IError = new Error(info.message)
    error.code = info.code
    return error
  }

  return { __ErrorCode, __ErrorMessage, CustomError, ErrorInfo }
}

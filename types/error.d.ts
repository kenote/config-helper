import { Maps, IError, IErrorInfo, IErrorState } from './'

/**
 * 错误处理
 * @param __ErrorCode Maps<number>
 * @param __ErrorMessage Maps<string>
 * @param start number
 */
export declare function KenoteConfigUseError (__ErrorCode: Maps<number>, __ErrorMessage: Maps<string>): IErrorState
export declare function KenoteConfigUseError (__ErrorCode: Maps<number>, __ErrorMessage: Maps<string>, start: number): IErrorState

/**
 * 错误信息
 */
export interface KenoteConfigErrorInfo {

  /**
   * 错误编号
   */
  code               : number

  /**
   * 错误描述
   */
  message           ?: string
}

/**
 * 自定义错误
 */
export interface KenoteConfigError extends Error {

  /**
   * 错误编号
   */
  code              ?: number
}

/**
 * 错误处理对象
 */
export interface KenoteConfigErrorState {

  /**
   * 错误编号集
   */
  __ErrorCode        : Maps<number>

  /**
   * 错误描述集
   */
  __ErrorMessage     : Maps<string>

  /**
   * 判断自定义错误
   */
  CustomError        : (e: IError) => boolean | 0 | undefined

  /**
   * 获取错误信息
   */
  ErrorInfo          : (code: number, opts?: any, json?: boolean) => IErrorInfo | IError
}

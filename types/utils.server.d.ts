import { Maps } from '../types'
import * as glob from 'glob'

export { default as Deploy } from '../src/deploy'

/**
 * 读取配置文件 集合
 * @param file string
 * @param type 'object' | 'array' | false
 * @param root string
 * @requires Maps<any> | Maps<any>[]
 */
export declare function loadData (file: string): Maps<any> | Maps<any>[]
export declare function loadData (file: string, type: 'object' | 'array' | false): Maps<any> | Maps<any>[]
export declare function loadData (file: string, type: 'object' | 'array' | false, options?: Maps<any>): Maps<any> | Maps<any>[]

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns string[]
 * @param options glob.IOptions
 * @returns string[]
 */
export declare function pickFiles (patterns: string[], options: glob.IOptions): Promise<string[]>

/**
 * Debug
 * @param name string
 * @param isweblog boolean
 */
export function debug (name: string, isweblog?: boolean): DebugResult

export interface DebugResult {
  info               : (message?: any, ...optionalParams: any[]) => void
  warn               : (message?: any, ...optionalParams: any[]) => void
  error              : (message?: any, ...optionalParams: any[]) => void
}
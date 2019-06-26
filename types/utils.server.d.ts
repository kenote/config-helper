import { Maps } from '../types'

/**
 * 读取配置文件 集合
 * @param file string
 * @param type 'object' | 'array' | false
 * @param root string
 * @requires Maps<any> | Maps<any>[]
 */
export declare function loadData (file: string): Maps<any> | Maps<any>[]
export declare function loadData (file: string, type: 'object' | 'array' | false): Maps<any> | Maps<any>[]
export declare function loadData (file: string, type: 'object' | 'array' | false, root?: string): Maps<any> | Maps<any>[]
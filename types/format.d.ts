import { Maps } from './'

/**
 * 数据格式化; 支持字符串、数字、日期格式
 * @param type 'string' | 'number' | 'date'
 * @param regexp RegExp
 * @param substr string
 * @param function string
 * @param options any[]
 * @param maps Maps<string>
 */
export interface KenoteConfigFormat {

  /**
   * 传入的数据类型
   */
  type              ?: 'string' | 'number' | 'date'

  /**
   * 通过正则表达式进行替换; 正则表达式 
   * @example 
   * regexp : /^(\d{4})(\d{2})(\d{2})$/
   */
  regexp            ?: RegExp

  /**
   * 通过正则表达式进行替换; 需要替换的格式
   * @example 
   * substr : '$1-$2-$3'
   */
  substr            ?: string

  /**
   * 通过函数去格式化数据
   * @example 
   * function : 'toLocaleString'
   */
  function          ?: string

  /**
   * 通过函数去格式化数据时，所需的参数
   * @example 
   * options : [ 'zh', { style: 'decimal' } ]
   */
  options           ?: any[]

  /**
   * 通过Map解析数据
   * @example
   * maps : { 0: '发放成功', 1: '发放中' }
   */
  maps              ?: Maps<string>

}
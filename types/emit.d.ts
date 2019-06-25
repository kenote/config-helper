import { KeyMap, Maps, Queryer } from './'

/**
 * 表格列单元操作项
 * @param key string
 * @param name string
 * @param api string
 * @param param string | string[]
 * @param options Maps<string | number> | KeyMap<string | number>[]
 */
export interface KenoteConfigColumnEmit extends KeyMap<string> {

  /**
   * 提交操作的 API 接口
   */
  api                : string

  /**
   * 附加参数
   */
  param             ?: string | string[]

  /**
   * 参数选项
   */
  options           ?: Maps<string | number> | KeyMap<string | number>[]


}

/**
 * 页面附加操作单元
 * @param key string
 * @param name string
 * @param api string
 * @param queryer Queryer[]
 */
export interface KenoteConfigPageEmit extends KeyMap<string> {

  /**
   * 提交操作的 API 接口
   */
  api                : string

  /**
   * 查询器模型
   */
  queryer           ?: Queryer[]

}

/**
 * 卡片模式下操作单元需要提取的数据
 * @param key string
 * @param param string
 */
export interface KenoteConfigCardEmit {

  /**
   * 提取数据的 key
   */
  key                : string

  /**
   * 输出参数对应的名称
   */
  param              : string

}
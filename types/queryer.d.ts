import { Format, KeyMap, Fetch, Rule } from './'

/**
 * 查询器单元; 用于生成表单数据
 * @param key string
 * @param name string
 * @param type string
 * @param mode string
 * @param placeholder string | string[]
 * @param default any
 * @param data KeyMap<string | number>[]
 * @param options string
 * @param fetch Fetch
 * @param disabled boolean
 * @param rules Rule[]
 * @param required boolean
 * @param format Format | Format[]
 * @param cardinal string
 */
export interface KenoteConfigQueryer extends KeyMap<string> {

  /**
   * 字段类型
   */
  type               : string

  /**
   * 当字段类型为日期选择器时，指定其显示类型
   */
  mode              ?: string

  /**
   * 字段占位内容
   */
  placeholder       ?: string | string[]

  /**
   * 字段默认值
   */
  default           ?: any

  /**
   * 选项数据
   */
  data              ?: KeyMap<string | number>[]

  /**
   * 选项数据; 取自 channel.options
   */
  options           ?: string

  /**
   * 选项数据; 取自远端 API 请求
   */
  fetch             ?: Fetch

  /**
   * 禁止字段输入、选择
   */
  disabled          ?: boolean

  /**
   * 验证规则
   */
  rules             ?: Rule[]

  /**
   * 如果字段不适用验证规则，是否不允许空值
   */
  required          ?: boolean

  /**
   * 格式化字段数据
   */
  format            ?: Format | Format[]

  /**
   * 此为特殊需求字段，目的是在多选单元里抽取指定参数进行拼接
   */
  cardinal          ?: string
}
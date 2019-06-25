import { KeyMap, Maps, Navigation } from './'

/**
 * 频道单元模型
 * @param id number
 * @param name string
 * @param label string
 * @param description string
 * @param default string
 * @param options Maps<number | string | KeyMap<string>[]>
 * @param navs Navigation[]
 */
export interface KenoteConfigChannel {

  /**
   * 频道 ID
   */
  id                 : number

  /**
   * 频道名称
   */
  name               : string

  /**
   * 频道标识符
   */
  label              : string

  /**
   * 频道表述
   */
  description       ?: string

  /**
   * 默认打开页面
   */
  default           ?: string

  /**
   * 自定义参数
   */
  options           ?: Maps<number | string | KeyMap<string>[]>

  /**
   * 页面导航
   */
  navs              : Navigation[]

}
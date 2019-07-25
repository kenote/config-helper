import { KeyMap, Maps, Navigation, KenoteConfig } from './'

/**
 * 加载导航器访问权限
 * @param navs Navigation[]
 * @param access string[]
 */
export declare function KenoteConfigAccessNavs (navs: Navigation[]): Navigation[]
export declare function KenoteConfigAccessNavs (navs: Navigation[], access: string[]): Navigation[]

/**
 * 获取当前频道 ID
 * @param channels KenoteConfig.Channel[]
 * @param routePath string
 * @returns number
 */
export declare function KenoteConfigGetChannelId (channels: KenoteConfig.Channel[], routePath: string): number

/**
 * 频道模型
 * @param channel KenoteConfig.Channel
 */
export declare class KenoteConfigChannelNav {

  /**
   * 导航器集合
   */
  private __channelNavs: Navigation[]

  constructor (channel: KenoteConfig.Channel)

  /**
   * 查询某个索引导航器模型
   * @param index string
   * @param navs Navigation[]
   * @returns Navigation | undefined
   */
  public find (index: string): Navigation | undefined
  public find (index: string, navs: Navigation[]): Navigation | undefined
}

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
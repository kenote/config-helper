import { KenoteConfig, Navigation } from '../types'

/**
 * 频道模型
 * @param channel KenoteConfig.Channel
 */
export default class Channel {

  private __channelNavs: Navigation[]

  constructor (channel: KenoteConfig.Channel) {
    this.__channelNavs = initMaps(channel.navs)
  }

  /**
   * 查询某个索引导航器模型
   * @param index string
   * @param navs Navigation[]
   * @returns Navigation | undefined
   */
  public find (index: string, navs: Navigation[] = this.__channelNavs): Navigation | undefined {
    let __nav: Navigation | undefined
    for (let nav of navs) {
      if (nav.index === index) {
        __nav = nav
        return __nav
      }
      else if (nav.children) {
        __nav = this.find(index, nav.children)
        if (__nav) return __nav
      }
    }
    return __nav
  }
}

/**
 * 获取当前频道 ID
 * @param channels KenoteConfig.Channel[]
 * @param routePath string
 * @returns number
 */
export function getChannelId (channels: KenoteConfig.Channel[], routePath: string): number {
  for (let channel of channels) {
    if (routePath.replace(/^\/|\/$/g, '') === channel.label) {
        return channel.id
    }
    if (channel.navs) {
      let __channelId: number = findChannelId(channel.navs, channel.id, routePath)
      if (__channelId > -1) {
        return __channelId
      }
    }
  }
  return -1
}

/**
 * 加载导航器访问权限
 * @param navs Navigation[]
 * @param access string[]
 */
export function accessNavs (navs: Navigation[], access?: string[]): Navigation[] {
  navs.forEach( nav => {
    let { children } = nav
    if (children) {
      nav.children = accessNavs(children, access)
    }
    else {
      nav.disabled = access && access.indexOf(nav.index) === -1
    }
  })
  return navs
}

/**
 * 生成导航器 Map 地图
 * @param navs Navigation[]
 * @returns Navigation[]
 */
function initMaps (navs: Navigation[], maps: Navigation[] = []): Navigation[] {
  navs.forEach( (nav: Navigation, __v: number) => {
    let { index, name } = nav
    nav.maps = [ ...maps ]
    nav.maps.push({ index, name, __v })
    if (nav.children) {
      return initMaps(nav.children, nav.maps)
    }
  })
  return navs
}

/**
 * 查询当前频道 ID
 * @param navs Navigation[]
 * @param id number
 * @param routePath string
 * @returns number
 */
function findChannelId (navs: Navigation[], id: number, routePath: string): number {
  let __id: number = -1
  for (let nav of navs) {
    if (nav.children) {
      let __currentNav: Navigation | undefined = nav.children.find( o => o.index === routePath )
      if (__currentNav) {
        return id
      }
      else {
        __id = findChannelId(nav.children, id, routePath)
      }
    }
    else if (nav.index === routePath) {
      return id
    }
  }
  return __id
}

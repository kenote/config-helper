import { KenoteConfigChannel } from './channel'
import { KenoteConfigColumns } from './columns'
import { KenoteConfigCardEmit, KenoteConfigColumnEmit, KenoteConfigPageEmit } from './emit'
import { KenoteConfigFormat } from './format'
import { KenoteConfigNavigation } from './navigation'
import { KenoteConfigQueryer } from './queryer'
import { KenoteConfigQuerySelect } from './queryselect'
import { KenoteConfigRule } from './rule'
import { KenoteConfigSubmit } from './submit'
import { Channel, getChannelId, accessNavs } from '../src'

export {
  accessNavs,
  Channel,
  getChannelId,
  KenoteConfigCardEmit as CardEmit,
  KenoteConfigColumnEmit as ColumnEmit,
  KenoteConfigColumns as Columns,
  KenoteConfigFetch as Fetch,
  KenoteConfigFormat as Format,
  KenoteConfigKeyMap as KeyMap,
  KenoteConfigMaps as Maps,
  KenoteConfigNavigation as Navigation,
  KenoteConfigPageEmit as PageEmit,
  KenoteConfigQueryer as Queryer,
  KenoteConfigQuerySelect as QuerySelect,
  KenoteConfigRule as Rule,
  KenoteConfigSubmit as Submit,
}

export declare namespace KenoteConfig {
  type Channel = KenoteConfigChannel
  type CardEmit = KenoteConfigCardEmit
  type ColumnEmit = KenoteConfigColumnEmit
  type Columns = KenoteConfigColumns
  type Fetch = KenoteConfigFetch
  type Format = KenoteConfigFormat
  type KeyMap<T> = KenoteConfigKeyMap<T>
  type Maps<T> = KenoteConfigMaps<T>
  type Navigation = KenoteConfigNavigation
  type PageEmit = KenoteConfigPageEmit
  type Queryer = KenoteConfigQueryer
  type QuerySelect = KenoteConfigQuerySelect
  type Rule = KenoteConfigRule
  type Rules = Maps<Rule[]>
  type Submit = KenoteConfigSubmit
}

interface KenoteConfigMaps<T> extends Record<string, T> {}

/**
 * KeyMap
 * @param key string
 * @param name any
 */
interface KenoteConfigKeyMap<T> {

  /**
   * 字段 Key
   */
  key                : string

  /**
   * 字段名称
   */
  name               : T

}

/**
 * 数据请求
 * @param api string
 * @param param string
 */
interface KenoteConfigFetch {

  /**
   * 需要请求的 API 接口
   */
  api                : string

  /**
   * API 接口返回的字段参数名称
   */
  param              : string

}
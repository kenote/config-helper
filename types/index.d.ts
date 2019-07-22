/// <reference path="scp2.d.ts" />

import { KenoteConfigChannel } from './channel'
import { KenoteConfigColumns } from './columns'
import { KenoteConfigCardEmit, KenoteConfigColumnEmit, KenoteConfigPageEmit } from './emit'
import { KenoteConfigFormat } from './format'
import { KenoteConfigNavigation } from './navigation'
import { KenoteConfigQueryer } from './queryer'
import { KenoteConfigQuerySelect } from './queryselect'
import { KenoteConfigRule } from './rule'
import { KenoteConfigSubmit } from './submit'
import { KenoteConfigError, KenoteConfigErrorInfo, KenoteConfigErrorState } from './error'
import { KenoteConfigServer, KenoteConfigMongoSetting } from './config'
import { KenoteConfigFix } from './fix'
import { KenoteConfigDeploy } from './deploy'
import { Channel, getChannelId, accessNavs, useError } from '../src'

export {
  accessNavs,
  Channel,
  getChannelId,
  useError,
  KenoteConfigBase,
  KenoteConfigCardEmit as CardEmit,
  KenoteConfigColumnEmit as ColumnEmit,
  KenoteConfigColumns as Columns,
  KenoteConfigDeploy as Deploy,
  KenoteConfigError as IError,
  KenoteConfigErrorInfo as IErrorInfo,
  KenoteConfigErrorState as IErrorState,
  KenoteConfigFetch as Fetch,
  KenoteConfigFix as Fix,
  KenoteConfigFormat as Format,
  KenoteConfigKeyMap as KeyMap,
  KenoteConfigMaps as Maps,
  KenoteConfigMongoSetting as MongoSetting,
  KenoteConfigNavigation as Navigation,
  KenoteConfigPageEmit as PageEmit,
  KenoteConfigQueryer as Queryer,
  KenoteConfigQuerySelect as QuerySelect,
  KenoteConfigRule as Rule,
  KenoteConfigServer as ServerConfiguration,
  KenoteConfigSubmit as Submit,
}

export declare namespace KenoteConfig {
  type Channel = KenoteConfigChannel
  type CardEmit = KenoteConfigCardEmit
  type ColumnEmit = KenoteConfigColumnEmit
  type Columns = KenoteConfigColumns
  type IError = KenoteConfigError
  type IErrorInfo = KenoteConfigErrorInfo
  type IErrorState = KenoteConfigErrorState
  type Fetch = KenoteConfigFetch
  type Fix = KenoteConfigFix
  type Format = KenoteConfigFormat
  type KeyMap<T> = KenoteConfigKeyMap<T>
  type Maps<T> = KenoteConfigMaps<T>
  type MongoSetting = KenoteConfigMongoSetting
  type Navigation = KenoteConfigNavigation
  type PageEmit = KenoteConfigPageEmit
  type Queryer = KenoteConfigQueryer
  type QuerySelect = KenoteConfigQuerySelect
  type Rule = KenoteConfigRule
  type Rules = Maps<Rule[]>
  type ServerConfiguration = KenoteConfigServer
  type Submit = KenoteConfigSubmit
}

interface KenoteConfigMaps<T> extends Record<string, T> {}

interface KenoteConfigBase {

  /**
   * 自定义选项
   */
  options            ?: KenoteConfigMaps<any>

}

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

import { Maps, MongoSetting, KenoteConfigBase } from './'

/**
 * 服务器配置
 */
export interface KenoteConfigServer extends KenoteConfigBase {

  /**
   * 服务器地址
   */
  Host              ?: string

  /**
   * 服务器端口
   */
  Port              ?: number

  /**
   * 站点名称
   */
  site_name         ?: string

  /**
   * 站点链接
   */
  site_url           ?: string

  /**
   * 默认语言
   */
  language           ?: string

  /**
   * Redis 配置
   */
  redis              ?: Maps<any>

  /**
   * MongoDB 配置
   */
  mongodb            ?: MongoSetting

  /**
   * Session 名称
   */
  session_secret     ?: string

}

/**
 * MongoDB 配置
 */
export interface KenoteConfigMongoSetting extends KenoteConfigBase {

  /**
   * MongoDB 链接
   */
  uris               ?: string | string[]
  
}
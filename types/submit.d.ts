import { Maps, KeyMap } from './'

/**
 * 数据提交选项
 * @param result string
 * @param name string
 * @param reset boolean
 * @param options string
 * @param alias Maps<Maps<any>>
 * @param plan string
 * @param message string
 */
export interface KenoteConfigSubmit {

  /**
   * 返回结果类型; 设为 message 时，指定 message 参数生效
   */
  result             : string

  /**
   * 提交按钮名称
   */
  name               : string

  /**
   * 是否显示重置按钮
   */
  reset             ?: boolean

  /**
   * 当提交数据与查询器模型字段不同时，设置 options 参数进行模版替换
   */
  options           ?: string

  /**
   * 别名映射
   */
  alias             ?: Maps<Maps<any>>

  /**
   * 加载用户方案，填写方案标识符
   */
  plan              ?: string

  /**
   * 当 result 设为 message 时设置提交成功后的消息
   */
  message           ?: string

  /**
   * RSTP 选项
   */
  rstps             ?: Rstps

}

/**
   * RSTP 选项
   */
interface Rstps {

  /**
   * 默认值
   */
  value             : string

  /**
   * 赋值参数；headers:rtsp_key | post:rtsp_key | get:rtsp_key
   */
  params            : string
}
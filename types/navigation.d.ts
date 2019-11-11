import { Navigation, Queryer, QuerySelect, Columns, Submit, CardEmit, Maps, KeyMap } from './'

/**
 * 导航器模型
 * @param index string
 * @param name string
 * @param icon string
 * @param children Navigation[]
 * @param maps Navigation[]
 * @param disabled boolean
 * @param queryer Queryer[]
 * @param querySelect QuerySelect
 * @param api string
 * @param polling string
 * @param cdtimes number
 * @param columns Columns[]
 */
export interface KenoteConfigNavigation {

  /**
   * 索引名称; 用于声明路由或分类
   */
  index              : string

  /**
   * 标题名称
   */
  name               : string

  /**
   * 图标
   */
  icon              ?: string

  /**
   * 子导航器
   */
  children          ?: Navigation[]

  /**
   * 用于生成 Map 地图
   */
  maps              ?: Navigation[]

  /**
   * 是否禁用
   */
  disabled          ?: boolean

  /**
   * 页面查询器
   */
  queryer           ?: Queryer[]

  /**
   * 多项页面查询器
   */
  querySelect       ?: QuerySelect

  /**
   * 页面查询器所请求的 API接口
   */
  api               ?: string

  /**
   * 设置轮询请求; 值为所依据的字段
   */
  polling           ?: string

  /**
   * 设置API请求的 CD时间
   */
  cdtimes           ?: number

  /**
   * 设置表格单元格
   */
  columns           ?: Columns[]

  /**
   * 提交设置
   */
  submit            ?: Submit

  /**
   * 搜索选项
   */
  search            ?: Search

  /**
   * 卡片模式设置
   */
  cards             ?: Cards

  /**
   * 图表模式
   */
  charts            ?: Charts

}

/**
 * 搜索选项
 */
export interface Search {

  /**
   * 搜索字段
   */
  field              : string
}

/**
 * 卡片模式设置
 */
export interface Cards {

  /**
   * 类型
   */
  type               : string

  /**
   * 操作单元
   */
  emit              ?: CardEmit

  /**
   * 请求数据
   */
  fetch             ?: Maps<string>
}

/**
 * 图表模式
 */
export interface Charts {

  /**
   * 类型
   */
  type               : string

  /**
   * 对比数据字段
   */
  prop               : string

  /**
   * 图表步进选项
   */
  step               : KeyMap<string>[]
}
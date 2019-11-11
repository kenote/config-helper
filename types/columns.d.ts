import { Format, KeyMap, ColumnEmit, Columns, Maps } from './'

/**
 * 表格列单元
 * @param key string
 * @param name string
 * @param fixed boolean | 'left' | 'right'
 * @param width number
 * @param minwidth number
 * @param format Format | Format[]
 * @param emit ColumnEmit[]
 */
export interface KenoteConfigColumns extends KeyMap<string> {

  /**
   * 是否固定在左右侧
   */
  fixed             ?: boolean | 'left' | 'right'

  /**
   * 列单元宽度
   */
  width             ?: number

  /**
   * 列单元最小宽带
   */
  minwidth          ?: number

  /**
   * 列单元数据格式化
   */
  format            ?: Format | Format[]

  /**
   * 操作选项
   */
  emit              ?: ColumnEmit[]

  /**
   * 子表格单元格
   */
  columns           ?: Columns[]

  /**
   * 列单元数据转译
   */
  parse             ?: Maps<string | number> | string

  

}
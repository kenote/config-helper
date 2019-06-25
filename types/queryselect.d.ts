
import { Queryer, Submit } from './'

/**
 * 标签页查询器模型
 * @param default string
 * @param options QuerySelectOption[]
 */
export interface KenoteConfigQuerySelect {

  /**
   * 默认查询器
   */
  default            : string

  /**
   * 查询器选项
   */
  options            : QuerySelectOption[]
}

/**
 * 查询器选项单元
 * @param key string
 * @param name string
 * @param queryer Queryer[]
 */
interface QuerySelectOption {

  /**
   * 选项单元 Key
   */
  key                : string

  /**
   * 选项单元名称
   */
  name               : string

  /**
   * 查询器模型
   */
  queryer            : Queryer[]

  /**
   * 数据提交选项
   */
  submit            ?: Submit
}

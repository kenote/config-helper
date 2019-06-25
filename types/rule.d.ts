
/**
 * 验证规则
 * @param required boolean
 * @param message string
 * @param trigger 'blur' | 'change' | Array<'blur' | 'change'>
 * @param type 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'data' | 'url' | 'hex' | 'email'
 * @param validator Validator | PromiseValidtor
 * @param min number
 * @param max number
 */
export interface KenoteConfigRule {

  /**
   * 是否不允许空值
   */
  required          ?: boolean

  /**
   * 警告描述
   */
  message           ?: string

  /**
   * 触发的响应事件名称
   */
  trigger           ?: 'blur' | 'change' | Array<'blur' | 'change'>

  /**
   * 验证类型
   */
  type              ?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'data' | 'url' | 'hex' | 'email'

  /**
   * 验证函数
   */
  validator         ?: Validator | PromiseValidtor

  /**
   * 允许最小字节长度
   */
  min               ?: number

  /**
   * 允许最大字节长度
   */
  max               ?: number
}

type Validator = (rule: any, value: any, done: (message?: string) => any) => (message?: string) => any
type PromiseValidtor = (rule: any, value: any, done: (message?: string) => any) => Promise<(message?: string) => any>
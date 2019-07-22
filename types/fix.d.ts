import { Maps, Fix } from './'

export declare namespace KenoteConfigFix {

  /**
   * 替换文件内容单元
   */
  interface ReplaceElement {

    /**
     * 名称
     */
    name               : string

    /**
     * 文件路径
     */
    file               : string

    /**
     * 执行内容
     */
    exec               : ReplaceExecElement[]
    
  }

  /**
   * 执行内容单元
   */
  interface ReplaceExecElement {

    /**
     * 查询文本内容
     */
    find               : string

    /**
     * 替换文本内容
     */
    content            : string

  }

}

export interface KenoteConfigFix extends Maps<any> {

  /**
   * 替换文件内容
   */
  replace           ?: Fix.ReplaceElement[]
}
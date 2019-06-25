import * as path from 'path'
import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import * as validator from 'validator'
import { Maps } from '../types'

/**
 * 读取配置文件
 * @param file string
 * @param root string
 * @requires Maps<any> | Maps<any>[]
 */
function loadDataFile (file: string, root?: string): Maps<any> | Maps<any>[] {
  let filePath: string = path.resolve(root || process.cwd(), file)
  let __data: Maps<any> | Maps<any>[] = {}
  if (!fs.existsSync(filePath)) return __data
  if (!/^\.(json|yaml|yml)$/.test(path.extname(filePath))) return __data
  let filrStr: string = fs.readFileSync(filePath, 'utf-8')
  if (validator.isJSON(filrStr)) {
    __data = JSON.parse(filrStr)
  }
  else {
    try {
      __data = yaml.load(filrStr)
    } catch (error) {
      
    }
  }
  return __data
}

/**
 * 读取配置文件 集合
 * @param file string
 * @param type 'object' | 'array' | false
 * @param root string
 * @requires Maps<any> | Maps<any>[]
 */
export function loadData (file: string, type: 'object' | 'array' | false = false, root?: string): Maps<any> | Maps<any>[] {
  let filePath: string = path.resolve(root || process.cwd(), file)
  let __data: Maps<any> | Maps<any>[] = type === 'array' ? [] : {}
  if (!fs.existsSync(filePath)) return __data
  let fileStat: fs.Stats = fs.statSync(filePath)
  if (fileStat.isFile()) return loadDataFile(file, root)
  if (fileStat.isDirectory()) {
    let files: string[] = fs.readdirSync(filePath).filter( o => /\.(json|yaml|yml)$/.test(o) )
    for (let item of files) {
      let itemdata: Maps<any> | Maps<any>[] = loadDataFile(path.resolve(filePath, item), root)
      if (type === 'array') {
        (<Maps<any>[]> __data).push(itemdata)
      }
      else {
        __data = { ...__data, ...itemdata }
      }
    }
  }
  return __data
}



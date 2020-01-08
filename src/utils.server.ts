import * as path from 'path'
import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import * as validator from 'validator'
import { Maps } from '../types'
import { template, templateSettings } from 'lodash'
import * as weblog from 'webpack-log'
import * as colors from 'colors'
import * as util from 'util'
import * as glob from 'glob'
import * as async from 'async'

/**
 * 读取配置文件
 * @param file string
 * @param root string
 * @requires Maps<any> | Maps<any>[]
 */
function loadDataFile (file: string, options: Maps<any> = {}): Maps<any> | Maps<any>[] {
  let filePath: string = path.resolve(options.root || process.cwd(), file)
  let __data: Maps<any> | Maps<any>[] = {}
  if (!fs.existsSync(filePath)) return __data
  if (!/^\.(json|yaml|yml)$/.test(path.extname(filePath))) return __data
  let filrStr: string = fs.readFileSync(filePath, 'utf-8')
  if (options.assign) {
    templateSettings.interpolate = /{{([\s\S]+?)}}/g
    filrStr = template(filrStr)(options.assign)
  }
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
export function loadData (file: string, type: 'object' | 'array' | false = false, options: Maps<any> = {}): Maps<any> | Maps<any>[] {
  let filePath: string = path.resolve(options.root || process.cwd(), file)
  let __data: Maps<any> | Maps<any>[] = type === 'array' ? [] : {}
  if (!fs.existsSync(filePath)) return __data
  let fileStat: fs.Stats = fs.statSync(filePath)
  if (fileStat.isFile()) return loadDataFile(file, options)
  if (fileStat.isDirectory()) {
    let files: string[] = fs.readdirSync(filePath).filter( o => /\.(json|yaml|yml)$/.test(o) )
    for (let item of dataFileSort(files)) {
      let itemdata: Maps<any> | Maps<any>[] = loadDataFile(path.resolve(filePath, item), options)
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

/**
 * 配置文件排序；将 *.default.(json|yaml|yml) 排到最前面, 将 *.release.(json|yaml|yml) 排到最后面
 * @param files string[]
 */
function dataFileSort (files: string[]): string[] {
  let reg: RegExp = /^(\S+)\.(default)\.(json|yaml|yml)$/
  files = files.sort( (a, b) => a.replace(reg, '0$1.$3') > b.replace(reg, '0$1.$3') ? 1 : -1 )
  let reg_release: RegExp = /^(\S+)\.(release)\.(json|yaml|yml)$/
  let absolute_release = /^(release)\.(json|yaml|yml)$/
  let files_arr1: string[] = files.filter( name => !reg_release.test(name) )
  let files_arr2: string[] = files.filter( name => reg_release.test(name) && !absolute_release.test(name) )
  let files_arr3: string[] = files.filter( name => absolute_release.test(name) )
  return [ ...files_arr1, ...files_arr2, ...files_arr3 ]
}

/**
 * 获取工作目录经过筛选的所有文件
 * @param patterns string[]
 * @param options glob.IOptions
 * @returns string[]
 */
export function pickFiles (patterns: string[], options: glob.IOptions): Promise<string[]> {
  return new Promise((resolve, reject) => {
    async.map(
      patterns,
      (pattern, next) => {
        glob(pattern, options, next)
      },
      (err, results) => {
        if (err) {
          reject(err)
        }
        else {
          let files: string[] = <string[]> (results || []).reduce((files: string[], item: string[]) => files.concat(item))
          resolve(files)
        }
      }
    )
  })
} 

/**
 * Debug
 * @param name string
 * @param isweblog boolean
 */
export function debug (name: string, isweblog?: boolean) {
  let log: any
  return {
    info: (message?: any, ...optionalParams: any[]): void => {
      let test: string = util.format(message, ...optionalParams)
      if (isweblog) {
        log = weblog({ name: `${name}:info` })
        log.info(colors.green(test))
      }
      else {
        console.log(colors.green(`[${name}:info]`.toLocaleUpperCase()), test)
      }
    },
    warn: (message?: any, ...optionalParams: any[]): void => {
      let test: string = util.format(message, ...optionalParams)
      if (isweblog) {
        log = weblog({ name: `${name}:warn` })
        log.info(colors.yellow(test))
      }
      else {
        console.log(colors.yellow(`[${name}:warn]`.toLocaleUpperCase()), test)
      }
    },
    error: (message?: any, ...optionalParams: any[]): void => {
      let test: string = util.format(message, ...optionalParams)
      if (isweblog) {
        log = weblog({ name: `${name}:error` })
        log.info(colors.red(test))
      }
      else {
        console.log(colors.red(`[${name}:error]`.toLocaleUpperCase()), test)
      }
    }
  }
}

export { default as Deploy } from './deploy'

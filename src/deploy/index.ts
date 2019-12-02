import * as urlParseLax from 'url-parse-lax'
import { UrlObject } from 'url'
import { ConnectConfig } from 'ssh2'
import { ScpOptions } from 'scp2'
import * as ftp from 'basic-ftp'
import * as path from 'path'
import chalk from 'chalk'
import { pick } from 'lodash'
import { debug, pickFiles } from '../utils.server'
import { Deploy as IDeploy } from '../../types'
import SSH from './ssh'
import SFTP from './sftp'
import FTP from './ftp'

export const log = debug('deploy')

/**
 * 服务器部署类
 */
export default class Deploy {

  /**
   * 执行远程命令
   * @param setting IDeploy.Command
   */
  public async command (setting: IDeploy.Command): Promise<void> {
    let { connect, command: cmd } = setting
    let config: ConnectConfig = <ConnectConfig> serverInfo(connect)
    try {
      await new SSH(config).exec(cmd.join(' && '))
      log.info('Command execution completed.\n')
    } catch (error) {
      log.error(error.message)
    }
  }

  /**
   * 上传文件队列
   * @param setting IDeploy.SFTPOptins
   * @returns boolean
   */
  public async upload (setting: IDeploy.SFTPOptins, type: 'sftp' | 'ftp' = 'sftp'): Promise<boolean> {
    let { server, privateKey, workspace: cwd, ignore, rules, deployTo } = setting
    let options: ScpOptions = <ScpOptions> serverInfo({ server, privateKey })
    let status: boolean = false
    try {
      let files: string[] = await pickFiles(setting.patterns || ['**'], { cwd, nodir: true, realpath: true, ignore })
      let uploadFiles: IDeploy.UploadFile[] = processFiles(files, { workspace: cwd, deployTo, rules })
      let client: SFTP | FTP
      let startime: number = Date.now()
      if (type === 'sftp') {
        client = new SFTP(options)
      }
      else {
        let ftpOptions: ftp.AccessOptions = {
          ...pick(options, ['host', 'port', 'password']),
          user: options.username
        }
        client = new FTP(ftpOptions)
      }
      await client.connect()
      log.info('')
      log.info('Processing Upload queue ...')
      log.info('\n')
      await upload(client, uploadFiles)
      client.end()
      let times: number = (Date.now() - startime) / 1000
      console.log('')
      log.info(`Times: ${times}s  Files: ${files.length}`)
      log.info(`Upload Completed.\n`)
      return true
    } catch (error) {
      log.error(error.message)
    }
    return status
  }
}

/**
 * 处理上传队列
 * @param client SFTP | FTP
 * @param files IDeploy.UploadFile[]
 */
async function upload (client: SFTP | FTP, files: IDeploy.UploadFile[]): Promise<void> {
  if (files.length == 0) return
  let file = files.shift()
  if (file) {
    try {
      await client.upload(file)
      file && success(file)
      if (files.length > 0) {
        await upload(client, files)
      }
    } catch (error) {
      file && failure(file)
    }
  }
}

/**
 * 传输成功信息
 * @param file IDeploy.UploadFile
 */
function success (file: IDeploy.UploadFile): void {
  let desc: string = chalk.cyan(`${file.filename} ${chalk.white('===>')} ${file.dest}`)
  console.log(chalk.greenBright('upload success :'), desc)
}

/**
 * 传输失败信息
 * @param file IDeploy.UploadFile
 */
function failure (file: IDeploy.UploadFile): void {
  let desc: string = chalk.yellow(`${file.filename} ${chalk.white('===>')} ${file.dest}`)
  console.log(chalk.redBright('upload failure :'), desc)
}

/**
 * 转换上传文件列表格式
 * @param files string[]
 * @param options IDeploy.UploadOptions
 * @returns IDeploy.UploadFile[]
 */
function processFiles (files: string[], options: IDeploy.UploadOptions): IDeploy.UploadFile[] {
  let { workspace, deployTo, rules } = options
  return files.map( item => {
    let filename: string = item.replace(new RegExp(`^(${workspace})`), '')
    let filepath: string = item
    let dest: string = path.join(deployTo || '/home', filename)
    let file: IDeploy.UploadFile = { filename, filepath, dest }
    rules && rules.forEach( rule => {
      customDest(file, rule, deployTo)
    })
    return file
  })
}

/**
 * 处理自定义规则
 * @param file IDeploy.UploadFile
 * @param rule IDeploy.Rule
 * @param root string
 */
function customDest (file: IDeploy.UploadFile, rule: IDeploy.Rule, root: string = ''): void {
  let pattern: RegExp = rule.test
  let matched: RegExpMatchArray | null = file.filepath.match(pattern)
  if (matched) {
    file.dest = rule.dest.replace(/\[\$(\d+)\]/g, (m, idx) => (<RegExpMatchArray> matched)[idx] )
    file.dest = path.join(root || '/home', file.dest)
  }
}

/**
 * 收集服务器连接信息
 * @param connect IDeploy.Connected
 * @returns ConnectConfig
 */
function serverInfo (connect: IDeploy.Connected): ConnectConfig | ScpOptions {
  let { server, privateKey } = connect
  let { hostname, port, slashes, auth, protocol } = <UrlObject> urlParseLax(server)
  let config: ConnectConfig | ScpOptions = { privateKey }
  if (hostname) config.host = hostname
  if (port) config.port = Number(port)
  if (slashes) {
    config.username = auth as string
  }
  else {
    config.username = (protocol && protocol.replace(/(\:)$/, '')) as string
    config.password = auth as string
  }
  return config
}

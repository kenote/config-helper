import * as ftp from 'basic-ftp'
import * as fs from 'fs-extra'
import * as path from 'path'
import { Deploy } from '../../types'
import { log } from './'

/**
 * FTP 类
 */
export default class FTP {

  /**
   * Client 对象
   */
  private __Client: ftp.Client

  /**
   * 连接选项
   */
  private __Options: ftp.AccessOptions

  constructor (options: ftp.AccessOptions) {
    this.__Options = options
    this.__Client = new ftp.Client()
    this.__Client.ftp.verbose = true
  }

  /**
   * 连接服务器
   */
  public async connect (): Promise<void> {
    try {
      await this.__Client.access(this.__Options)
      console.log('')
      log.info('Ftp :: connect to %s', this.__Options.host)
    } catch (error) {
      this.__Client.close()
      throw error
    }
  }

  /**
   * 上传文件
   * @param file Deploy.UploadFile
   */
  public async upload (file: Deploy.UploadFile): Promise<void> {
    await this.__Client.ensureDir(path.dirname(file.dest))
    await this.__Client.upload(fs.createReadStream(file.filepath), file.dest)
  }

  /**
   * 关闭连接
   */
  public end (): void {
    this.__Client.close()
  }
}

import { Client, ScpOptions } from 'scp2'
import { isString } from 'lodash'
import { Deploy } from '../../types'
import { log } from './'

/**
 * SFTP 类
 */
export default class SFTP {

  /**
   * Client 对象
   */
  private __Client: Client

  /**
   * 连接选项
   */
  private __Options: ScpOptions

  constructor (options: ScpOptions) {
    this.__Options = options
  }

  /**
   * 连接服务器
   */
  public async connect (): Promise<void> {
    this.__Client = new Client(this.__Options)
    return new Promise((resolve, reject) => {
      this.__Client
        .on('ready', () => {
          console.log('')
          log.info('Sftp :: connect to %s', this.__Options.host)
        })
        .on('error', err => {
          reject(err)
        })
        .on('close', () => {
          
        })
        .sftp( (err, sftp) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(sftp)
          }
        })
    })
  }

  /**
   * 上传文件
   * @param file file: Deploy.UploadFile
   */
  public async upload (file: Deploy.UploadFile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.__Client.upload(file.filepath, file.dest, err => {
        if (err) {
          reject(isString(err) ? new Error(err) : err)
        }
        else {
          resolve(undefined)
        }
      })
    })
  }

  /**
   * 关闭连接
   */
  public end () {
    this.__Client.close()
  }
}

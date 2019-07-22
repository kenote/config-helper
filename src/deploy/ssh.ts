import { Client, ConnectConfig } from 'ssh2'
import { log } from './'

/**
 * SSH 类
 */
export default class SSH {

  /**
   * 连接选项
   */
  private __Options: ConnectConfig

  constructor (options: ConnectConfig) {
    this.__Options = options
  }

  /**
   * 执行远程命令
   * @param command string
   */
  public async exec (command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let client: Client = new Client()
      client
        .on('ready', () => {
          log.info('Sftp :: connect to %s', this.__Options.host)
          log.info('')
          log.info('Execute command line commands ...')
          log.info('')
          log.info(command)
          log.info('\n')
          client.exec(command, (err, stream) => {
            if (err) throw err
            stream
              .on('close', (code, signal) => client.end() )
              .on('data', (data: any) => log.info('\n\n' + data) )
              .stderr.on('data', (data: any) => log.info('STDERR: ' + data) )
          })
        })
        .on('error', err => reject(err))
        .on('close', hadError => resolve(undefined))
        .connect(this.__Options)
    })
  }
}

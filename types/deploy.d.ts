
import { Maps } from './'

export declare namespace KenoteConfigDeploy {

  interface Configuration {
    alias               : Maps<any>
    projects            : Project[]
  }

  interface Project extends Maps<any> {
    index               : string
    name                : string
    sftp               ?: SFTPOptins
    ftp                ?: FTPOptions
    command            ?: Command[]
  }

  interface SFTPOptins extends FTPOptions {
    privateKey         ?: string
  }

  interface FTPOptions extends UploadOptions {
    server              : string
    patterns            : string[]
    ignore              : string[]
  }

  interface UploadOptions {
    workspace           : string
    deployTo            : string
    rules              ?: Rule[]
  }

  interface UploadFile {
    filename            : string
    filepath            : string
    dest                : string
  }

  interface Rule {
    test                : RegExp
    dest                : string
  }

  interface Command {
    index               : string
    name                : string
    connect             : Connected
    command             : string[]

  }

  interface Connected {
    server              : string
    privateKey         ?: string
  }
  
}
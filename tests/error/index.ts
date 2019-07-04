
import { loadData } from '../../src/utils.server'
import { useError } from '../../src'
import { Maps } from '../../types'

const ErrorCode: Maps<any> = loadData('tests/config/errors/code.yml')
const ErrorMessage: Maps<any> = loadData('tests/config/errors/message/zh-cn.yml')
const { __ErrorCode, __ErrorMessage, CustomError, ErrorInfo } = useError(ErrorCode, ErrorMessage, 1000)

export { __ErrorCode, __ErrorMessage, CustomError, ErrorInfo }

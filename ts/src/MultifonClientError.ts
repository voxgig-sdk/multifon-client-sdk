
import { Context } from './Context'


class MultifonClientError extends Error {

  isMultifonClientError = true

  sdk = 'MultifonClient'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MultifonClientError
}


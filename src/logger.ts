/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2022-11-14 01:28:10
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \node-server\src\logger.ts
 */
import { Context } from 'koa'
import { config } from './config'
import { transports, format } from 'winston'
import * as path from 'path'

const logger = (winstonInstance: any): any => {
  winstonInstance.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      //
      // - Write all logs error (and below) to `error.log`.
      // new transports.File({ filename: path.resolve(__dirname, '../error.log'), level: 'error' }),
      //
      // - Write to all logs with specified level to console.
      new transports.Console({
        // format: format.combine(format.colorize(), format.simple())
      })
    ]
  })

  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime()
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = err.message
    }
    const ms = new Date().getTime() - start

    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.log(logLevel, msg)
  }
}

export { logger }

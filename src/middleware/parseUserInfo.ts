/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-17 02:18:27
 * @LastEditTime: 2023-01-18 01:39:35
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\middleware\parseUserInfo.ts
 */
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { Context } from 'koa'
import { config } from '../config'

export default function (ctx: Context, next) {
  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization.substring(7)
    if (token && token !== 'undefined') {
      try {
        const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload
        if (!decoded.userId) {
          // return responseTemplate.authError(ctx, {
          //   err: 'AccessTokenExpired Error',
          //   errInfo: 'AccessTokenExpired Error'
          // })

          ctx.status = 401
          ctx.body = {
            code: 1,
            msg: '受保护的资源，请通过请求头提供权限认证。',
            data: null
          }
          return
        }

        ctx.user = {
          token: token,
          userId: decoded.userId,
          userName: decoded.userName
        }
      } catch (e) {
        ctx.status = 401
        ctx.body = {
          code: 1,
          msg: '提供的权限认证 Token 无效。',
          data: null
        }
        return
      }
    }
  }

  if (ctx.URL.pathname.includes('/api/wedding-invitation')) {
    const mpname = ctx.request.header?.mpname
    if (!mpname) {
      ctx.status = 400
      ctx.body = {
        code: 1,
        msg: '请求失败，未提供 mpname 参数',
        data: null
      }
      return
    }
  }

  return next()
}

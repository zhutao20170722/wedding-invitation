/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-12-14 22:15:39
 * @LastEditTime: 2022-12-21 23:49:31
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\controller\wechat.ts
 */
import { BaseContext, Context } from 'koa'
import { description, request, summary, tagsAll, query, body, security } from 'koa-swagger-decorator'
import _ from 'lodash'
import { code2Session, decryptData } from '@src/service/wechatService'

@tagsAll(['微信接口'])
export default class WechatController {
  @request('get', '/api/wechat/code2Session')
  @summary('code2Session获取用户唯一的openid')
  @description('code2Session获取用户唯一的openid')
  @query({
    jsCodeMP: { type: 'string', required: true }
  })
  public static async code2Session(ctx: Context): Promise<void> {
    const { jsCodeMP } = ctx.query

    const data = await code2Session(jsCodeMP)

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data
    }
  }

  @request('get', '/api/wechat/getUserInfoByCode')
  @summary('获取微信用户信息')
  @description('获取微信用户信息')
  @query({
    jsCodeMP: { type: 'string', required: true },
    encryptedData: { type: 'string', required: true },
    iv: { type: 'string', required: true }
  })
  public static async getUserInfoByCode(ctx: Context): Promise<void> {
    const { jsCodeMP, encryptedData, iv } = ctx.query

    const sResult = await code2Session(jsCodeMP)
    const { openid, session_key: sessionKey } = sResult
    const data = await decryptData(sessionKey, encryptedData, iv)
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data
    }
  }
}

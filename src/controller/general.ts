/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2022-11-14 01:32:34
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \node-server\src\controller\general.ts
 */
import { BaseContext } from 'koa'
import { description, request, summary, tagsAll } from 'koa-swagger-decorator'

@tagsAll(['General'])
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description('A simple welcome message to verify the service is up and running.')
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!'
  }
}

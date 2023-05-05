/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-14 01:59:12
 * @LastEditTime: 2023-01-29 23:38:01
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\controller\wedding-invitation.ts
 */
import { BaseContext, Context } from 'koa'
import { description, request, summary, tagsAll, query, body, security, params } from 'koa-swagger-decorator'
import path from 'path'
import { LowSync, JSONFileSync } from '@commonify/lowdb'
import _ from 'lodash'
import { defined } from '@src/util'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { config } from '@src/config'
/**
 * common 通用配置数据
 */
const dbFileCommon = path.join(__dirname, '../db/wedding-invitation/common.json')
const dbCommonData = new LowSync(new JSONFileSync<any>(dbFileCommon))

/**
 * music 配置数据
 */
const dbFileMusic = path.join(__dirname, '../db/wedding-invitation/music.json')
const dbMusicData = new LowSync(new JSONFileSync<any>(dbFileMusic))

/**
 * indexBanner 邀请函页面数据
 */
const dbFileIndexBanner = path.join(__dirname, '../db/wedding-invitation/indexBanner.json')
const dbIndexBannerData = new LowSync(new JSONFileSync<any>(dbFileIndexBanner))

/**
 * photoBanner 相册页面数据
 */
const dbFilePhotoBanner = path.join(__dirname, '../db/wedding-invitation/photoBanner.json')
const dbPhotoBannerData = new LowSync(new JSONFileSync<any>(dbFilePhotoBanner))

/**
 * user 好友祝福页面
 */
const dbFileUserBanner = path.join(__dirname, '../db/wedding-invitation/user.json')
const dbUserData = new LowSync(new JSONFileSync<any>(dbFileUserBanner))

/**
 * 留言板数据
 */
const dbFileMessage = path.join(__dirname, '../db/wedding-invitation/message.json')
const dbMessageData = new LowSync(new JSONFileSync<any>(dbFileMessage))

/**
 * 留言板出席数据
 */
const dbFilePresent = path.join(__dirname, '../db/wedding-invitation/present.json')
const dbPresentData = new LowSync(new JSONFileSync<any>(dbFilePresent))

@tagsAll(['wedding-invitation 小程序数据接口'])
export default class WeddingInvitationController {
  @request('get', '/api/wedding-invitation/getCommonConfig')
  @summary('获取通用配置')
  @description('获取通用配置')
  public static async getCommonConfig(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbCommonData.read()
    const dbResult = dbCommonData.data[mpname]

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @request('get', '/api/wedding-invitation/getMusicConfig')
  @summary('获取音乐配置')
  @description('获取音乐配置')
  public static async getMusicConfig(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbMusicData.read()
    const dbResult = dbMusicData.data[mpname]

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @request('get', '/api/wedding-invitation/getIndexBannerList')
  @summary('获取邀请函页面轮播图列表')
  @description('获取邀请函页面轮播图列表')
  public static async getIndexBannerList(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbIndexBannerData.read()
    const dbResult = dbIndexBannerData.data[mpname]

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @request('get', '/api/wedding-invitation/getPhotoBannerList')
  @summary('获取相册页面轮播图列表')
  @description('获取相册页面轮播图列表')
  public static async getPhotoBannerList(ctx: Context): Promise<void> {
    dbPhotoBannerData.read()
    const mpname = ctx.request.header.mpname as string
    const dbResult = dbPhotoBannerData.data[mpname]

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @query({
    openId: {
      type: 'string',
      required: true,
      description: 'openId'
    }
  })
  @request('get', '/api/wedding-invitation/getUserByOpenId')
  @summary('通过 openId 获取用户')
  @description('通过 openId 获取用户')
  public static async getUserByOpenId(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbUserData.read()
    const dbResult: any[] = dbUserData.data[mpname]

    const { openId } = ctx.query

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult.filter(v => v._openid === openId)
    }
  }

  @request('post', '/api/wedding-invitation/addOrUpdateUser')
  @body({
    _id: {
      type: 'string'
    },
    _openid: {
      type: 'string'
    },
    user: {
      type: 'object',
      properties: {
        country: {
          type: 'string'
        },
        avatarUrl: {
          type: 'string'
        },
        nickName: {
          type: 'string'
        },
        gender: {
          type: 'number'
        },
        language: {
          type: 'string'
        },
        city: {
          type: 'string'
        },
        province: {
          type: 'string'
        }
      }
    }
  })
  @summary('添加用户')
  @description('通过添加用户')
  public static async addOrUpdateUser(ctx: Context): Promise<void> {
    dbUserData.read()
    const mpname = ctx.request.header.mpname as string
    const dbResult: any[] = dbUserData.data[mpname]
    const requestBody = ctx.request.body as any
    const index = dbResult.findIndex(v => v._openid === requestBody._openid)
    if (index === -1) {
      requestBody._id = requestBody._id || uuidv4()
      dbResult.push(requestBody)
    } else {
      dbResult.splice(index, 1, requestBody)
    }

    dbUserData.write()

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: requestBody
    }
  }

  @request('get', '/api/wedding-invitation/getUserList')
  @summary('获取用户列表')
  @description('获取用户列表')
  public static async getUserList(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbUserData.read()
    const dbResult: any[] = dbUserData.data[mpname]

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @request('get', '/api/wedding-invitation/getMessageList')
  @summary('获取留言板列表')
  @description('获取留言板列表')
  public static async getMessageList(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    dbMessageData.read()
    const dbResult = dbMessageData.data[mpname]

    dbResult.sort((a, b) => {
      const v1 = typeof a.customIndex === 'number' ? a.customIndex : 999
      const v2 = typeof b.customIndex === 'number' ? b.customIndex : 999
      return v2 - v1
    })

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: dbResult
    }
  }

  @request('post', '/api/wedding-invitation/addMessage')
  @summary('添加一条留言')
  @description('添加一条留言')
  public static async addMessage(ctx: Context): Promise<void> {
    const requestBody = ctx.request.body as any
    const mpname = ctx.request.header.mpname as string
    dbMessageData.read()
    const dbResult: any[] = dbMessageData.data[mpname]

    requestBody._id = requestBody._id || uuidv4()
    dbResult.push(requestBody)

    dbMessageData.write()

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: requestBody
    }
  }

  @request('post', '/api/wedding-invitation/deleteMessage')
  @summary('删除一条留言')
  @description('删除一条留言')
  public static async deleteMessage(ctx: Context): Promise<void> {
    const requestBody = ctx.request.body as any
    const mpname = ctx.request.header.mpname as string
    dbMessageData.read()
    const dbResult: any[] = dbMessageData.data[mpname]

    const index = dbResult.findIndex(v => v._id === requestBody._id)
    if (index > -1) {
      dbResult.splice(index, 1)
    } else {
      ctx.status = 200
      ctx.body = {
        code: 0,
        msg: '删除失败，原因：没找到对应 id 的留言。',
        data: requestBody
      }
      return
    }

    dbMessageData.write()

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: requestBody
    }
  }

  @request('get', '/api/wedding-invitation/getPresentList')
  @summary('获取出席数据列表')
  @description('获取出席数据列表')
  @query({
    openid: {
      type: 'string',
      description: 'openid'
    }
  })
  public static async getPresentList(ctx: Context): Promise<void> {
    const { openid } = ctx.query
    const mpname = ctx.request.header.mpname as string
    dbPresentData.read()
    const dbResult = dbPresentData.data[mpname]
    const records = _.filter(dbResult, v => {
      let match = true
      if (defined(openid)) {
        match = match && v._openid === openid
      }

      return match
    })

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: records
    }
  }

  @request('post', '/api/wedding-invitation/addOrUpdatePresent')
  @body({
    _id: {
      type: 'string'
    },
    _openid: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    count: {
      type: 'string'
    },
    desc: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  })
  @summary('增加或者更新出席用户')
  @description('增加或者更新出席用户')
  public static async addOrUpdatePresent(ctx: Context): Promise<void> {
    dbPresentData.read()
    const mpname = ctx.request.header.mpname as string
    const dbResult: any[] = dbPresentData.data[mpname]
    const requestBody = ctx.request.body as any
    const index = dbResult.findIndex(v => v._openid === requestBody._openid)
    if (index === -1) {
      requestBody._id = requestBody._id || uuidv4()
      dbResult.push(requestBody)
    } else {
      dbResult.splice(index, 1, requestBody)
    }

    dbPresentData.write()

    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: requestBody
    }
  }

  @request('post', '/api/wedding-invitation/uploadAvatar')
  @summary('上传头像')
  @description('上传头像')
  @query({
    openId: { type: 'string', required: true }
  })
  public static async uploadAvatar(ctx: Context): Promise<void> {
    const mpname = ctx.request.header.mpname as string
    const request = ctx.request as any
    const file = request.files.file
    const openId = request.body.openId
    // 获取文件类型
    const mimetype = file.mimetype
    // 获取文件名，并根据文件名获取扩展名
    let filename = file.originalFilename
    let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : ''
    // 文件名没有扩展名时候，则从文件类型中取扩展名
    if (extname === '' && mimetype.indexOf('/') >= 0) {
      extname = '.' + mimetype.split('/')[1]
    }
    // 文件将要上传到哪个文件夹下面
    const uploadfolderpath = path.join(__dirname, `../public/wedding-invitation/avatar/${mpname}`)
    filename = openId + extname

    const folderExists = fs.existsSync(uploadfolderpath)
    if (!folderExists) {
      fs.mkdirSync(uploadfolderpath, { recursive: true })
    }
    // 构建将要存储的文件的路径
    const filenewpath = path.join(uploadfolderpath, filename)
    console.log(filenewpath)
    let result = ''
    const tempfilepath = file.filepath
    // 将临时文件保存为正式的文件
    try {
      fs.renameSync(tempfilepath, filenewpath)
    } catch (err) {
      if (err) {
        // 发生错误
        result = 'error|save error'
        fs.unlinkSync(tempfilepath)
        ctx.status = 200
        ctx.body = {
          code: 1,
          msg: `上传图片失败，原因：${err}`
        }
      }
    }

    const signaturePicUrl = `${config.host}/public/wedding-invitation/avatar/${
      ctx.request.header?.mpname || 'unknown'
    }/${filename}`
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '成功',
      data: signaturePicUrl
    }
  }
}

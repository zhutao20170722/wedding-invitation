/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2023-01-30 15:20:24
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\unprotectedRoutes.ts
 */
import Router from '@koa/router'
import { general, wechat, weddingInvitation } from './controller'

const unprotectedRouter = new Router()

// Hello World route
unprotectedRouter.get('/', general.helloWorld)
// wechat common
unprotectedRouter.get('/api/wechat/code2Session', wechat.code2Session)
unprotectedRouter.get('/api/wechat/getUserInfoByCode', wechat.getUserInfoByCode)
// wedding-invitation
// 获取通用配置
unprotectedRouter.get('/api/wedding-invitation/getCommonConfig', weddingInvitation.getCommonConfig)
// 获取音乐配置
unprotectedRouter.get('/api/wedding-invitation/getMusicConfig', weddingInvitation.getMusicConfig)
// 获取首页轮播图列表
unprotectedRouter.get('/api/wedding-invitation/getIndexBannerList', weddingInvitation.getIndexBannerList)
// 获取相册页轮播图列表
unprotectedRouter.get('/api/wedding-invitation/getPhotoBannerList', weddingInvitation.getPhotoBannerList)
// 获取留言板数据
unprotectedRouter.get('/api/wedding-invitation/getMessageList', weddingInvitation.getMessageList)
// 新增留言
unprotectedRouter.post('/api/wedding-invitation/addMessage', weddingInvitation.addMessage)
// 删除留言
unprotectedRouter.post('/api/wedding-invitation/deleteMessage', weddingInvitation.deleteMessage)
// 获取留言板出席数据
unprotectedRouter.get('/api/wedding-invitation/getPresentList', weddingInvitation.getPresentList)
// 增加或者更新出席用户
unprotectedRouter.post('/api/wedding-invitation/addOrUpdatePresent', weddingInvitation.addOrUpdatePresent)
// 通过 openId 获取用户
unprotectedRouter.get('/api/wedding-invitation/getUserByOpenId', weddingInvitation.getUserByOpenId)
// 添加用户
unprotectedRouter.post('/api/wedding-invitation/addOrUpdateUser', weddingInvitation.addOrUpdateUser)
// 获取用户列表
unprotectedRouter.get('/api/wedding-invitation/getUserList', weddingInvitation.getUserList)
// 上传头像
unprotectedRouter.post('/api/wedding-invitation/uploadAvatar', weddingInvitation.uploadAvatar)

export { unprotectedRouter }

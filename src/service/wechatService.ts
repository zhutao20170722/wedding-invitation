/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-12-16 00:48:23
 * @LastEditTime: 2023-01-29 10:36:10
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\service\wechatService.ts
 */
import axios from 'axios'
import WXBizDataCrypt from '@src/common/WXBizDataCrypt'
// import WXBizDataCrypt from '../common/WXBizDataCrypt'

export function code2Session(jsCode) {
  return axios
    .get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WECHAT_APPID_MP}&secret=${process.env.WECHAT_APP_SECRET_MP}&js_code=${jsCode}&grant_type=authorization_code`
    )
    .then(res => {
      return res.data
    })
}

/**
 * 解密微信加密数据
 * @param sessionKey
 * @param encryptedData
 * @param iv
 * @returns
 */
export function decryptData(sessionKey, encryptedData, iv) {
  const pc = new WXBizDataCrypt(process.env.WECHAT_APPID_MP, sessionKey)
  const data = pc.decryptData(encryptedData, iv)
  return data
}

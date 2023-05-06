/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2023-01-30 00:14:18
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\main.ts
 */

import { createSSRApp } from 'vue'
import 'miniprogram-api-typings'
import './animate.scss'

import App from './App.vue'
import { GlobalData } from './types'
import { getMusicConfig } from './api/wedding-invitation'

if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
  wx.cloud.init({
    env: import.meta.env.VITE_VUE_WECHAT_ENV as string
  })
}

let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true

const globalData: GlobalData = {
  innerAudioContext,
  musicList: [],
  musicIndex: 1,
  animations: [
    `bounce`,
    `flash`,
    `pulse`,
    `rubberBand`,
    `shake`,
    `headShake`,
    `swing`,
    `tada`,
    `wobble`,
    `jello`,
    `bounceIn`,
    `bounceInDown`,
    `bounceInLeft`,
    `bounceInRight`,
    `bounceInUp`,
    `fadeIn`,
    `fadeInDown`,
    `fadeInDownBig`,
    `fadeInLeft`,
    `fadeInLeftBig`,
    `fadeInRight`,
    `fadeInRightBig`,
    `fadeInUp`,
    `fadeInUpBig`,
    `flipInX`,
    `flipInY`,
    `lightSpeedIn`,
    `rotateIn`,
    `rotateInDownLeft`,
    `rotateInDownRight`,
    `rotateInUpLeft`,
    `rotateInUpRight`,
    `jackInTheBox`,
    `rollIn`,
    `zoomIn`,
    `zoomInDown`,
    `zoomInLeft`,
    `zoomInRight`,
    `zoomInUp`,
    `slideInDown`,
    `slideInLeft`,
    `slideInRight`,
    `slideInUp`,
    `heartBeat`
  ]
}

if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
  const db = wx.cloud.database()
  const music = db.collection('music')

  music.get().then(res => {
    globalData.musicList = res.data as any[]
    innerAudioContext.src = globalData.musicList[0].musicUrl
  })
} else {
  getMusicConfig().then(res => {
    globalData.musicList = res.data as any[]
    innerAudioContext.src = globalData.musicList[0].musicUrl
  })
}

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.globalData = globalData

  return {
    app
  }
}

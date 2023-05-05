/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-09-15 15:53:05
 * @LastEditTime: 2023-04-19 22:19:23
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation-node-server\ecosystem.config.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
module.exports = {
  apps: [
    {
      name: '[5000]wedding-invitation-rest-server',
      script: 'dist/server.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'null',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      log: './logs/app.log',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
    },
  ]
}

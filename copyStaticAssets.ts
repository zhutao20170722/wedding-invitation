/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2023-01-30 15:36:22
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\copyStaticAssets.ts
 */
import * as shell from 'shelljs'

shell.cp('-R', 'src/public', 'dist/')
shell.cp('-R', 'src/db', 'dist/db/')

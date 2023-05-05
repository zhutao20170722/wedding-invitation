/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2023-01-28 23:25:13
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\config.ts
 */
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export interface Config {
  port: number
  debugLogging: boolean
  dbsslconn: boolean
  jwtSecret: string
  // databaseUrl: string
  dbEntitiesPath: string[]
  cronJobExpression: string
  host: string
}

const isDevMode = process.env.NODE_ENV == 'development'

const config: Config = {
  port: +(process.env.PORT || 5000),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'wqdjkwl12e21FQlk1j2dasdadsadaad2',
  // databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
  dbEntitiesPath: [...(isDevMode ? ['src/entity/**/*.ts'] : ['dist/entity/**/*.js'])],
  cronJobExpression: '0 * * * *',
  host: process.env.DOMAIN || 'http://127.0.0.1:5000'
}

export { config }

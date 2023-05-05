/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2023-01-29 10:36:03
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\server.ts
 */
// require('module-alias/register')
import path from 'path'
import moduleAlias from 'module-alias'
// Or multiple aliases
moduleAlias.addAliases({
  '@src': path.resolve(__dirname, './')
})

import Koa from 'koa'
import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import body from 'koa-body'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import winston from 'winston'
import 'reflect-metadata'
import KoaStatic from 'koa-static'
import KoaMount from 'koa-mount'
import { logger } from './logger'
import { config } from './config'
import { unprotectedRouter } from './unprotectedRoutes'
import { protectedRouter } from './protectedRoutes'
import { cron } from './cron'
// import * as typeorm from './typeorm'
import parseUserInfo from './middleware/parseUserInfo'

const app = new Koa()

// Provides important security headers to make your app more secure
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'online.swagger.io', 'validator.swagger.io']
    }
  })
)

// Enable cors with default options
app.use(cors())

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston))

// Enable bodyParser with default options
// app.use(bodyParser())
app.use(
  body({
    multipart: true,
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // parse GET, HEAD, DELETE requests
    formidable: {
      uploadDir: path.join(__dirname, './tmp/uploads')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })
)

app.use(function (ctx, next) {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = {
        code: 1,
        msg: '受保护的资源，请通过请求头提供权限认证。',
        data: null
      }
    } else {
      throw err
    }
  })
})

app.use(parseUserInfo)
// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())
app.use(KoaMount('/public', KoaStatic(__dirname + '/public/')))
// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-|^\/auth|^\/public/] }))
// These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

// Register cron job to do any action needed
cron.start()
//
// typeorm.initialize()
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

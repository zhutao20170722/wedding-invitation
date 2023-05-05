/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-11-13 23:54:50
 * @LastEditTime: 2023-01-30 15:19:35
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\protectedRoutes.ts
 */
import { SwaggerRouter } from 'koa-swagger-decorator'
import { user } from './controller'

const protectedRouter = new SwaggerRouter()

// USER ROUTES
protectedRouter.get('/users', user.getUsers)
protectedRouter.get('/users/:id', user.getUser)
protectedRouter.post('/users', user.createUser)
protectedRouter.put('/users/:id', user.updateUser)
protectedRouter.delete('/users/:id', user.deleteUser)

// Swagger endpoint
protectedRouter.swagger({
  title: 'wedding-invitation-rest-server',
  description:
    'API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.',
  version: '1.8.0'
})

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname)

export { protectedRouter }

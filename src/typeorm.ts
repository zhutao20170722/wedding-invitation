/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2023-01-04 01:49:52
 * @LastEditTime: 2023-01-30 16:01:14
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-rest-server\src\typeorm.ts
 */
import { config } from '@src/config'
import { DataSource } from 'typeorm'

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
// const mysqlDataSource: DataSource = new DataSource({
//   type: 'mysql',
//   host: 'api.com',
//   port: 3306,
//   username: 'test',
//   password: 'test',
//   database: 'test',
//   entities: config.dbEntitiesPath,
//   ssl: config.dbsslconn, // if not development, will use SSL
//   synchronize: true
// })

const pgsqlDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'api.com',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: config.dbEntitiesPath,
  // ssl: config.dbsslconn, // if not development, will use SSL
  ssl: false, // if not development, will use SSL
  synchronize: true
})

const initialize = () => {
  const promises = []
  // promises.push(mysqlDataSource.initialize())
  promises.push(pgsqlDataSource.initialize())
  Promise.all(promises)
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch(err => {
      console.error('Error during Data Source initialization', err)
    })
}

// export { mysqlDataSource, pgsqlDataSource, initialize }
export { pgsqlDataSource, initialize }

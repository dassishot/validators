// Update with your config settings.
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

// const fs = require('fs')
// const pg = require('pg')
// pg.defaults.ssl = true

module.exports = {
  development: {
    client: process.env.APP_DB_CLIENT,
    connection: {
      host: process.env.APP_DB_HOST,
      user: process.env.APP_DB_USER,
      database: process.env.APP_DB_DATABASE,
      password: process.env.APP_DB_PASSWORD,
      port: process.env.APP_DB_PORT
    },
    pool: {
      min: 2,
      max: 5
    },
    useNullAsDefault: true
    // debug: true
  },
  production: {
    client: process.env.APP_DB_CLIENT,
    connection: {
      host: process.env.APP_DB_HOST,
      user: process.env.APP_DB_USER,
      database: process.env.APP_DB_DATABASE,
      password: process.env.APP_DB_PASSWORD,
      port: process.env.APP_DB_PORT
    },
    pool: {
      min: 2,
      max: 5
    },
    useNullAsDefault: true
    // debug: true
  }
}

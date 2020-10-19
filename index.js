const yup = require('./src/extends')
const { validate, getErrors } = require('./src/middleware')

module.exports = { yup, validate, getErrors }
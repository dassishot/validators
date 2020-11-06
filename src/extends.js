const yup = require('yup')

yup.addMethod(yup.string, 'fnc', function ({ message = 'default message', fn = value => false }) {
  return this.test('fnc', message, async value => (value && !!await fn(value)) ? true : false)
})

module.exports = yup
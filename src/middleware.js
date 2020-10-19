const R = require('ramda')
const getErrors = error => R.pipe(R.prop('inner'), R.map(({ path, value, message }) => ({ path, value, message })))(error)

const validate = (schema, attrs = 'body') => async (req, res, next) => {
  try {
    await schema.validate({ ...req[attrs] }, { abortEarly: false })
  } catch (errors) {
    res.send(400, { errors: getErrors(errors) })
    return next(new Error('boom!'))
  }
  return next()
}

module.exports = { validate, getErrors }

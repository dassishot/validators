require('dotenv').config()

const R = require('ramda')
const yup = require('../index')

const knexfile = require('../knexfile')
const config = ({ development }) => knex => knex(development)
const knex = config(knexfile)(require('knex'))

const getError = error => R.pipe(R.prop('inner'), R.map(({ path, value, message }) => ({ path, value, message })))(error)
const getUnique = value => knex('users').where({ email: value }).first('id')

test('Não deve retornar error pois nao existe fn', async () => {

  const schema = yup.object().shape({ email: yup.string().fnc({ message: 'already registered' }).required() })

  const errors = await schema
    .validate({ email: 'dassishot@gmail.com' }, { abortEarly: false, recursiva: false })
    .catch(getError)

  const isArray = Array.isArray(errors)

  expect(isArray).toBe(false)
})


test('Deve retornar true caso exista email a base de dados', async () => {

  const schema = yup.object().shape({
    email: yup.string().fnc({ message: 'already registered', fn: getUnique }).required()
  })

  const errors = await schema
    .validate({ email: 'dassishot@gmail.com' }, { abortEarly: false })
    .catch(getError)

  const { path, value, message } = R.head(errors)

  expect(errors).toEqual(expect.arrayContaining(errors))

  expect(path).toBe('email')
  expect(value).toBe('dassishot@gmail.com')
  expect(message).toBe('already registered')
})
require('dotenv').config()

const R = require('ramda')
const yup = require('../src/extends')
const { getErrors } = require('../src/middleware')

const knexfile = require('../knexfile')
const config = ({ development }) => knex => knex(development)
const knex = config(knexfile)(require('knex'))

const getUnique = value => knex('users').where({ email: value }).first('id')

test('Não deve retornar error pois nao existe fn', async () => {

  const schema = yup.object().shape({ email: yup.string().fnc({ message: 'already registered' }).required() })

  const errors = await schema
    .validate({ email: 'dassishot@gmail.com' }, { abortEarly: false })
    .catch(getErrors)

  const isArray = Array.isArray(errors)

  expect(isArray).toBe(false)
})


test('Deve retornar true caso exista email a base de dados', async () => {

  const schema = yup.object().shape({
    email: yup.string().fnc({ message: 'already registered', fn: getUnique }).required()
  })

  const errors = await schema
    .validate({ email: 'dassishot@gmail.com' }, { abortEarly: false })
    .catch(getErrors)

  const { path, value, message } = R.head(errors)

  expect(errors).toEqual(expect.arrayContaining(errors))

  expect(path).toBe('email')
  expect(value).toBe('dassishot@gmail.com')
  expect(message).toBe('already registered')
})

test('Deve retornar true caso não exista email a base de dados', async () => {

  const schema = yup.object().shape({ email: yup.string().fnc({ message: 'already registered', fn: getUnique }).required() })

  const errors = await schema
    .validate({ email: 'dassishotaaaaaagmail.com' }, { abortEarly: false })
    .catch(getErrors)

  console.log(errors)


  const isArray = Array.isArray(errors)

  expect(isArray).toBe(false)
})

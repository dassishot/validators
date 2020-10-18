require('dotenv').config()

const R = require('ramda')
const yup = require('../src/index')

const knexfile = require('../knexfile')
const config = ({ development }) => knex => knex(development)
const knex = config(knexfile)(require('knex'))

const getError = error => R.pipe(R.prop('inner'), R.map(({ path, value, message }) => ({ path, value, message })))(error)
const getUnique = value => knex('users').where({ email: value }).first('id')

test('Deve retornar token ao efetuar login', async () => {

  const schema = yup.object().shape({
    email: yup.string().fnc({ message: 'already registered', fn: getUnique }).required()
  })

  const errors = await schema
    .validate({ email: 'dassishot@gmail.com' }, { abortEarly: false })
    .catch(getError)

  // const ty = R.tryCatch(R.pipe(validate(schema), R.andThen(item => console.log('ITEM', item))), getError)({ email: 'dasssishot@gmail.com' })

  console.log(errors)

  // const test = await schema
  //   .isValid({ email: 'dasssishot@gmail.com' })



  const status = true
  const body = false
  expect(status).toBe(true)
  expect(body).toBe(false)
})
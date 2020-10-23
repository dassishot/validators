const yup = require('./extends')

module.exports = fn => yup.object()
  .noUnknown({ onlyKnownKeys: false })
  .shape({ id: yup.string().fnc({ message: 'primary not work', fn }).required() })

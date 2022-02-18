import _ from 'lodash'

const mapErrors = (err) => {
  if (err.inner.length === 0) {
    throw new Error('no error found! check to see if you are using { abortEarly: true }? This can also be an error unrelated to validation!')
  }

  const errorMessages = {}

  err.inner.forEach(({ path, errors: [msg] }) => {
    _.set(errorMessages, path, msg)
  })

  return errorMessages
}

export default mapErrors

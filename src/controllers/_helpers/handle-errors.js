import mapErrors from './map-errors.js'

const handleErrors = (res, err) => {
  switch (err.constructor.name) {
    case 'PrismaClientKnownRequestError':
      if (err.code === 'P2025') return res.status(404).json(err.meta.cause)
      return res.status(400).json(err)
    case 'NotFoundError':
      return res.status(404).json('Entry Not Found')
    case 'ValidationError':
      return res.status(406).json(mapErrors(err))
    default:
      console.log(err)
      return res.status(400).json(err)
  }
}

export default handleErrors

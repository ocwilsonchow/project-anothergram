import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const checkOwnership = async (req, res, next) => {
  try {
    const { params: { id }, session: { user: { id: userId } } } = req
    await prisma.post.findFirst({ where: { id: Number(id), userId }, rejectOnNotFound: true })
    return next()
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default checkOwnership

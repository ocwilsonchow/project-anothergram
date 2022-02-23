import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiWishlistsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedPost = await prisma.post.delete({ where: { id: Number(id) } })
    return res.status(200).json(deletedPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiWishlistsDestroy
]

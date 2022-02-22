import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiWishlistsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundWishlist = await prisma.post.findUnique({
      where: { id: Number(id) },
      rejectOnNotFound: true,
    })
    return res.status(200).json(foundWishlist)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiWishlistsShow
]

import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const controllersApiWishlistsDestroy = async (req, res) => {
  try {
    const postId = parseInt(req.query.id)

    const deletedComments = await prisma.comment.deleteMany({
      where: {
        postId: postId
      }
    })

    const deletedPost = await prisma.post.deleteMany({
      where: {
        id: postId
      }
    })


    return res.status(200).json(deletedComments)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiWishlistsDestroy
]

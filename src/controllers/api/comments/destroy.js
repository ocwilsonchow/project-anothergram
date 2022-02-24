import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'
import checkOwnership from '../my/posts/_check-ownership.js'

const controllersApiCommentDestroy = async (req, res) => {
  try {
    const postId = req.body.deleteId
    const deleteComment = await prisma.comment.delete({
      where: {
        id: postId }
      })
    return res.status(200).json(deleteComment)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiCommentDestroy
]

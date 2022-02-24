import prisma from '../../_helpers/prisma'
import handleErrors from '../../_helpers/handle-errors'
import checkOwnership from '../my/posts/_check-ownership'

const controllersApiCommentDestroy = async (req, res) => {
  try {
    const postId = req.body.deleteId
    const deletedPost = await prisma.comment.delete({
      where: {
        id: postId } })
    return res.status(200).json(deletedPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  controllersApiCommentDestroy
]

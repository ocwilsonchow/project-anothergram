import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'


const controllersApiCommentDestroy = async (req, res) => {
  try {
    const deleteId = Number(req.query.deleteId)
    const deleteComment = await prisma.comment.delete({
      where: {
        id: deleteId
      }
    })
    return res.status(200).json(deleteComment)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [

  controllersApiCommentDestroy
]

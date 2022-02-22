import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPostsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundPost = await prisma.post.findUnique({
      where: {
        id: Number(id),
       },
      rejectOnNotFound: true,

    })
    return res.status(200).json(foundPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPostsShow

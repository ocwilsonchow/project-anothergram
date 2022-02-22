import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyPostsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    const foundMyPosts = await prisma.post.findMany({
      where: {
        id: userId
      }
    })

    return res.status(200).json({
      posts: foundMyPosts
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsIndex

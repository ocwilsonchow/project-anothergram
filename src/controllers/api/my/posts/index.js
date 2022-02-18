import prisma from '../../../_helpers/prisma.js'
import handleErrors from '../../../_helpers/handle-errors.js'

const controllersApiMyPostsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    const foundPosts = await prisma.post.findMany()
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMyPostsIndex
